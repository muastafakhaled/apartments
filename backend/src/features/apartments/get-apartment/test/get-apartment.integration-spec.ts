import { HttpStatus } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import {
  DomainException,
  ResourceNotFoundError,
} from '../../../../shared/http/domain-exception';
import { ErrorCode } from '../../../../shared/http/error-code.enum';
import { createApartmentsTestingModule } from '../../../../test/apartments-testing.module';
import { PostgresFixture } from '../../../../test/postgres.fixture';
import { GetApartmentHandler } from '../get-apartment.handler';
import { seedApartmentDetail } from './get-apartment.seed';

describe('GetApartmentHandler (integration)', () => {
  let fixture: PostgresFixture;
  let moduleRef: TestingModule;
  let handler: GetApartmentHandler;

  beforeAll(async () => {
    fixture = await PostgresFixture.start();
    moduleRef = await createApartmentsTestingModule();
    handler = moduleRef.get(GetApartmentHandler);
  });

  beforeEach(() => fixture.clean());

  afterAll(() => moduleRef.close());

  it('returns the full apartment detail with all relations', async () => {
    const seeded = await seedApartmentDetail(fixture.dataSource);

    const data = await handler.execute(seeded.apartmentId);

    expect(data.id).toBe(seeded.apartmentId);
    expect(data.referenceNo).toBe(seeded.referenceNo);
    expect(data.compound).toBe(seeded.compoundName);
    expect(data.area).toBe(seeded.areaName);
    expect(data.developer).toBe(seeded.developerName);
    expect(data.amenities.sort()).toEqual([...seeded.amenityNames].sort());
    expect(data.paymentPlans).toHaveLength(1);
  });

  it('resolves the apartment image url', async () => {
    const seeded = await seedApartmentDetail(fixture.dataSource);

    const data = await handler.execute(seeded.apartmentId);

    expect(data.imageUrl).toContain(seeded.imageUrl);
  });

  it('throws a 404 NotFound for a missing id', async () => {
    const error = await handler.execute(999_999).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ResourceNotFoundError);
    expect((error as DomainException).errorCode).toBe(ErrorCode.NotFound);
    expect((error as DomainException).getStatus()).toBe(HttpStatus.NOT_FOUND);
  });
});
