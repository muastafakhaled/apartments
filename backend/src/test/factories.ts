import {
  Amenity,
  Apartment,
  ApartmentStatus,
  Area,
  Compound,
  Currency,
  Developer,
  Finishing,
  InstallmentFrequency,
  PaymentPlan,
  SaleType,
} from '../domain';

let counter = 0;
const unique = () => ++counter;

/**
 * Entity builders with sane defaults for integration seeding. Every field is
 * overridable, so a spec states only what its assertions care about.
 */

export const buildDeveloper = (over: Partial<Developer> = {}): Developer =>
  Object.assign(new Developer(), { name: `Developer ${unique()}` }, over);

export const buildArea = (over: Partial<Area> = {}): Area =>
  Object.assign(new Area(), { name: `Area ${unique()}` }, over);

export const buildCompound = (over: Partial<Compound> = {}): Compound =>
  Object.assign(new Compound(), { name: `Compound ${unique()}` }, over);

export const buildAmenity = (over: Partial<Amenity> = {}): Amenity =>
  Object.assign(new Amenity(), { name: `Amenity ${unique()}` }, over);

export const buildApartment = (over: Partial<Apartment> = {}): Apartment =>
  Object.assign(
    new Apartment(),
    {
      referenceNo: `NWY-T${unique()}`,
      title: 'Test Apartment',
      description: 'Test apartment description',
      imageUrl: `apartments/${unique()}/thumb.webp`,
      currency: Currency.EGP,
      status: ApartmentStatus.ReadyToMove,
      saleType: SaleType.Resale,
      finishing: Finishing.FullyFinished,
      price: 1_000_000,
      areaSqm: 120,
      bedrooms: 3,
      bathrooms: 2,
      floor: 1,
      mapLat: 30,
      mapLng: 31,
    },
    over,
  );

export const buildPaymentPlan = (
  over: Partial<PaymentPlan> = {},
): PaymentPlan =>
  Object.assign(
    new PaymentPlan(),
    {
      downPaymentPct: 10,
      termMonths: 60,
      installmentAmount: 50_000,
      installmentFrequency: InstallmentFrequency.Quarterly,
    },
    over,
  );
