import { TestingModule } from '@nestjs/testing';
import { createApartmentsTestingModule } from '../../../../test/apartments-testing.module';
import { PostgresFixture } from '../../../../test/postgres.fixture';
import { seedListing } from '../../list-apartments/test/list-apartments.seed';
import { GetFilterRangesHandler } from '../filter-ranges.handler';

describe('GetFilterRangesHandler (integration)', () => {
  let fixture: PostgresFixture;
  let moduleRef: TestingModule;
  let handler: GetFilterRangesHandler;

  beforeAll(async () => {
    fixture = await PostgresFixture.start();
    moduleRef = await createApartmentsTestingModule();
    handler = moduleRef.get(GetFilterRangesHandler);
  });

  beforeEach(() => fixture.clean());

  afterAll(() => moduleRef.close());

  it('returns the min/max bounds present in the data', async () => {
    const seeded = await seedListing(fixture.dataSource);

    const ranges = await handler.execute();

    expect(ranges.price).toEqual({ min: seeded.priceMin, max: seeded.priceMax });
    expect(ranges.area).toEqual({ min: seeded.areaMin, max: seeded.areaMax });
    expect(ranges.bedrooms.max).toBe(seeded.bedroomsMax);
  });
});
