import { TestingModule } from '@nestjs/testing';
import { ApartmentStatus, Finishing, SaleType } from '../../../../domain';
import { createApartmentsTestingModule } from '../../../../test/apartments-testing.module';
import { PostgresFixture } from '../../../../test/postgres.fixture';
import { ListApartmentsHandler } from '../list-apartments.handler';
import { ListApartmentsRequest } from '../list-apartments.request';
import { seedListing } from './list-apartments.seed';

const query = (
  over: Partial<ListApartmentsRequest> = {},
): ListApartmentsRequest =>
  Object.assign(new ListApartmentsRequest(), { page: 1, limit: 12 }, over);

describe('ListApartmentsHandler (integration)', () => {
  let fixture: PostgresFixture;
  let moduleRef: TestingModule;
  let handler: ListApartmentsHandler;

  beforeAll(async () => {
    fixture = await PostgresFixture.start();
    moduleRef = await createApartmentsTestingModule();
    handler = moduleRef.get(ListApartmentsHandler);
  });

  beforeEach(() => fixture.clean());

  afterAll(() => moduleRef.close());

  it('paginates with correct meta and page size', async () => {
    const seeded = await seedListing(fixture.dataSource);

    const data = await handler.execute(query({ page: 1, limit: 12 }));

    expect(data.items).toHaveLength(12);
    expect(data.meta.total).toBe(seeded.total);
    expect(data.meta.page).toBe(1);
    expect(data.meta.totalPages).toBe(Math.ceil(seeded.total / 12));
  });

  it('returns the remainder on the last page', async () => {
    const seeded = await seedListing(fixture.dataSource);

    const data = await handler.execute(query({ page: 2, limit: 12 }));

    expect(data.items).toHaveLength(seeded.total - 12);
  });

  it('filters by sale type', async () => {
    const seeded = await seedListing(fixture.dataSource);

    const data = await handler.execute(
      query({ saleType: SaleType.DeveloperSale, limit: 50 }),
    );

    expect(data.meta.total).toBe(seeded.developerSaleCount);
    expect(data.items.every((i) => i.saleType === SaleType.DeveloperSale)).toBe(
      true,
    );
  });

  it('filters by a minimum number of bedrooms', async () => {
    const seeded = await seedListing(fixture.dataSource);

    const data = await handler.execute(query({ minBedrooms: 2, limit: 50 }));

    expect(data.meta.total).toBe(seeded.minTwoBedroomsCount);
    expect(data.items.every((i) => (i.bedrooms ?? 0) >= 2)).toBe(true);
  });

  it('filters by a minimum number of bathrooms', async () => {
    const seeded = await seedListing(fixture.dataSource);

    const data = await handler.execute(query({ minBathrooms: 2, limit: 50 }));

    expect(data.meta.total).toBe(seeded.minTwoBathroomsCount);
    expect(data.items.every((i) => (i.bathrooms ?? 0) >= 2)).toBe(true);
  });

  it('filters by finishing', async () => {
    const seeded = await seedListing(fixture.dataSource);

    const data = await handler.execute(
      query({ finishing: Finishing.SemiFinished, limit: 50 }),
    );

    expect(data.meta.total).toBe(seeded.semiFinishedCount);
    expect(data.items.every((i) => i.finishing === Finishing.SemiFinished)).toBe(
      true,
    );
  });

  it('filters by status', async () => {
    const seeded = await seedListing(fixture.dataSource);

    const data = await handler.execute(
      query({ status: ApartmentStatus.Launch, limit: 50 }),
    );

    expect(data.meta.total).toBe(seeded.launchStatusCount);
    expect(data.items.every((i) => i.status === ApartmentStatus.Launch)).toBe(
      true,
    );
  });

  it('filters by a minimum price', async () => {
    const seeded = await seedListing(fixture.dataSource);

    const data = await handler.execute(
      query({ minPrice: seeded.priceThreshold, limit: 50 }),
    );

    expect(data.meta.total).toBe(seeded.atOrAbovePriceCount);
    expect(
      data.items.every((i) => (i.price ?? 0) >= seeded.priceThreshold),
    ).toBe(true);
  });

  it('filters by an inclusive area range', async () => {
    const seeded = await seedListing(fixture.dataSource);

    const data = await handler.execute(
      query({ minArea: seeded.areaMin, maxArea: seeded.areaMin, limit: 50 }),
    );

    expect(data.meta.total).toBeGreaterThan(0);
    expect(data.items.every((i) => i.areaSqm === seeded.areaMin)).toBe(true);
  });

  it('intersects filters (AND), returning empty on a mismatched pair', async () => {
    const seeded = await seedListing(fixture.dataSource);

    const data = await handler.execute(
      query({
        saleType: SaleType.DeveloperSale,
        minBedrooms: seeded.bedroomsMax + 1,
      }),
    );

    expect(data.meta.total).toBe(0);
  });

  it('returns an empty page when no apartments exist', async () => {
    const data = await handler.execute(query());

    expect(data.items).toEqual([]);
    expect(data.meta.total).toBe(0);
  });
});
