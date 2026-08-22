import { DataSource } from 'typeorm';
import {
  ApartmentStatus,
  Apartment,
  Area,
  Compound,
  Developer,
  Finishing,
  SaleType,
} from '../../../../domain';
import {
  buildApartment,
  buildArea,
  buildCompound,
  buildDeveloper,
} from '../../../../test/factories';

export interface SeededListing {
  areaAName: string;
  areaBName: string;
  compoundBName: string;
  developerBName: string;
  partitionBCount: number;
  developerSaleCount: number;
  minTwoBedroomsCount: number;
  minTwoBathroomsCount: number;
  semiFinishedCount: number;
  launchStatusCount: number;
  priceMin: number;
  priceMax: number;
  areaMin: number;
  areaMax: number;
  bedroomsMax: number;
  bathroomsMax: number;
  atOrAbovePriceCount: number;
  priceThreshold: number;
  total: number;
}

/**
 * Seeds two projects, each in its own area / developer, with a controlled
 * spread of sale type, bedrooms, price and area across partition A so every
 * list filter and the filter-range bounds can be asserted against known
 * numbers. Apartments are created in insertion order, matching the handler's
 * `ORDER BY apartment.id`.
 */
export async function seedListing(ds: DataSource): Promise<SeededListing> {
  const developerAName = 'Palm Hills Developments';
  const developerBName = 'Mountain View';
  const areaAName = 'New Cairo';
  const areaBName = 'Zayed';
  const compoundAName = 'Mivida';
  const compoundBName = 'Palm Zayed';

  const [developerA, developerB] = await ds
    .getRepository(Developer)
    .save([
      buildDeveloper({ name: developerAName }),
      buildDeveloper({ name: developerBName }),
    ]);
  const [areaA, areaB] = await ds
    .getRepository(Area)
    .save([buildArea({ name: areaAName }), buildArea({ name: areaBName })]);

  const compoundA = await ds
    .getRepository(Compound)
    .save(
      buildCompound({ name: compoundAName, area: areaA, developer: developerA }),
    );
  const compoundB = await ds
    .getRepository(Compound)
    .save(
      buildCompound({ name: compoundBName, area: areaB, developer: developerB }),
    );

  const partitionA = Array.from({ length: 15 }, (_, i) =>
    buildApartment({
      compound: compoundA,
      saleType: i < 5 ? SaleType.DeveloperSale : SaleType.Resale,
      bedrooms: (i % 3) + 1,
      bathrooms: (i % 3) + 1,
      finishing: i % 2 === 0 ? Finishing.SemiFinished : Finishing.FullyFinished,
      status: i % 2 === 0 ? ApartmentStatus.Launch : ApartmentStatus.ReadyToMove,
      price: 1_000_000 + i * 100_000,
      areaSqm: 100 + i * 10,
    }),
  );
  const partitionB = Array.from({ length: 3 }, () =>
    buildApartment({
      compound: compoundB,
      saleType: SaleType.Resale,
      bedrooms: 3,
      price: 1_000_000,
      areaSqm: 120,
    }),
  );
  const all = [...partitionA, ...partitionB];
  await ds.getRepository(Apartment).save(all);

  const prices = all.map((a) => a.price ?? 0);
  const areas = all.map((a) => a.areaSqm ?? 0);
  const bedrooms = all.map((a) => a.bedrooms ?? 0);
  const bathrooms = all.map((a) => a.bathrooms ?? 0);
  const priceThreshold = 2_000_000;

  return {
    areaAName,
    areaBName,
    compoundBName,
    developerBName,
    partitionBCount: partitionB.length,
    developerSaleCount: all.filter((a) => a.saleType === SaleType.DeveloperSale)
      .length,
    minTwoBedroomsCount: all.filter((a) => (a.bedrooms ?? 0) >= 2).length,
    minTwoBathroomsCount: all.filter((a) => (a.bathrooms ?? 0) >= 2).length,
    semiFinishedCount: all.filter((a) => a.finishing === Finishing.SemiFinished)
      .length,
    launchStatusCount: all.filter((a) => a.status === ApartmentStatus.Launch)
      .length,
    priceMin: Math.min(...prices),
    priceMax: Math.max(...prices),
    areaMin: Math.min(...areas),
    areaMax: Math.max(...areas),
    bedroomsMax: Math.max(...bedrooms),
    bathroomsMax: Math.max(...bathrooms),
    atOrAbovePriceCount: all.filter((a) => (a.price ?? 0) >= priceThreshold)
      .length,
    priceThreshold,
    total: all.length,
  };
}
