import { TestingModule } from '@nestjs/testing';
import { QueryFailedError } from 'typeorm';
import {
  Apartment,
  ApartmentStatus,
  Finishing,
  InstallmentFrequency,
  PaymentPlan,
  SaleType,
} from '../../../../domain';
import { createApartmentsTestingModule } from '../../../../test/apartments-testing.module';
import { PostgresFixture } from '../../../../test/postgres.fixture';
import { CreateApartmentHandler } from '../create-apartment.handler';
import { CreateApartmentRequest } from '../create-apartment.request';
import { seedCreateRefs } from './create-apartment.seed';

const request = (
  over: Partial<CreateApartmentRequest> = {},
): CreateApartmentRequest =>
  Object.assign(
    new CreateApartmentRequest(),
    {
      title: 'New Apartment',
      description: 'A new apartment',
      imageUrl: 'apartments/new/thumb.webp',
      saleType: SaleType.Resale,
      finishing: Finishing.FullyFinished,
      price: 3_000_000,
      areaSqm: 120,
      bedrooms: 3,
      bathrooms: 2,
      floor: 1,
      mapLat: 30,
      mapLng: 31,
    },
    over,
  );

describe('CreateApartmentHandler (integration)', () => {
  let fixture: PostgresFixture;
  let moduleRef: TestingModule;
  let handler: CreateApartmentHandler;

  beforeAll(async () => {
    fixture = await PostgresFixture.start();
    moduleRef = await createApartmentsTestingModule();
    handler = moduleRef.get(CreateApartmentHandler);
  });

  beforeEach(() => fixture.clean());

  afterAll(() => moduleRef.close());

  it('persists an apartment with amenities and payment plans', async () => {
    const refs = await seedCreateRefs(fixture.dataSource);

    const result = await handler.execute(
      request({
        compoundId: refs.compoundId,
        amenityIds: refs.amenityIds,
        price: 5_000_000,
        paymentPlans: [
          {
            downPaymentPct: 10,
            termMonths: 60,
            installmentAmount: 75_000,
            installmentFrequency: InstallmentFrequency.Quarterly,
          },
        ],
      }),
    );

    const id = result.id;
    expect(result.referenceNo).toMatch(/^NWY-[0-9A-Z]{10}$/);

    const saved = await fixture.dataSource.getRepository(Apartment).findOne({
      where: { id },
      relations: { amenities: true },
    });
    expect(saved!.price).toBe(5_000_000);
    expect(saved!.status).toBe(ApartmentStatus.New); // column default when omitted
    expect(saved!.amenities.map((a) => a.id).sort()).toEqual(
      [...refs.amenityIds].sort(),
    );

    const plans = await fixture.dataSource
      .getRepository(PaymentPlan)
      .findBy({ apartmentId: id });
    expect(plans).toHaveLength(1);
  });

  it('rejects an unknown compoundId and persists nothing', async () => {
    const error = await handler
      .execute(request({ compoundId: 999_999 }))
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(QueryFailedError);
    await expect(
      fixture.dataSource.getRepository(Apartment).count(),
    ).resolves.toBe(0);
  });

  it('rejects unknown amenityIds and persists nothing', async () => {
    const refs = await seedCreateRefs(fixture.dataSource);

    const error = await handler
      .execute(request({ compoundId: refs.compoundId, amenityIds: [999_999] }))
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(QueryFailedError);
    await expect(
      fixture.dataSource.getRepository(Apartment).count(),
    ).resolves.toBe(0);
  });
});
