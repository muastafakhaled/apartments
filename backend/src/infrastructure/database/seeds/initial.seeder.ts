import { DataSource, EntityManager } from 'typeorm';
import { Seeder } from 'typeorm-extension';
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
} from '../../../domain';

const developers: Pick<Developer, 'id' | 'name'>[] = [
  { id: 1, name: 'Palm Hills Developments' },
  { id: 2, name: 'Mountain View' },
  { id: 3, name: 'City Edge Developments' },
  { id: 4, name: 'Marakez' },
  { id: 5, name: 'SODIC' },
  { id: 6, name: 'Dorra Group' },
  { id: 7, name: 'Ora Developers' },
  { id: 8, name: 'Modon Egypt' },
  { id: 9, name: 'El Masria Group Developments' },
  { id: 10, name: 'Saudi Egyptian Developers (SED)' },
  { id: 11, name: 'Madinet Masr' },
];

const areas: Pick<Area, 'id' | 'name'>[] = [
  { id: 1, name: '6th of October City' },
  { id: 2, name: 'New Cairo' },
  { id: 3, name: 'New Capital City' },
  { id: 4, name: 'New Zayed' },
  { id: 5, name: 'Ras El Hekma' },
  { id: 6, name: 'El Sheikh Zayed' },
  { id: 7, name: 'Mostakbal City' },
  { id: 8, name: 'Sidi Heneish' },
  { id: 9, name: '6th Settlement' },
  { id: 10, name: 'South New Cairo' },
  { id: 11, name: 'Alexandria' },
];

type CompoundSeed = Pick<
  Compound,
  | 'id'
  | 'name'
  | 'areaId'
  | 'developerId'
  | 'developerStartPrice'
  | 'resaleStartPrice'
>;

const compounds: CompoundSeed[] = [
  {
    id: 1,
    name: 'PX',
    areaId: 1,
    developerId: 1,
    developerStartPrice: null,
    resaleStartPrice: 20300000,
  },
  {
    id: 2,
    name: 'Mountain View Hyde Park',
    areaId: 2,
    developerId: 2,
    developerStartPrice: null,
    resaleStartPrice: 14000000,
  },
  {
    id: 3,
    name: 'Al Maqsad',
    areaId: 3,
    developerId: 3,
    developerStartPrice: 6345000,
    resaleStartPrice: null,
  },
  {
    id: 4,
    name: 'AEON Towers',
    areaId: 1,
    developerId: 4,
    developerStartPrice: null,
    resaleStartPrice: 12500000,
  },
  {
    id: 5,
    name: 'Jirian - Mountain View',
    areaId: 4,
    developerId: 2,
    developerStartPrice: 12150000,
    resaleStartPrice: null,
  },
  {
    id: 6,
    name: 'Bloom Island - Ogami',
    areaId: 5,
    developerId: 5,
    developerStartPrice: 30049000,
    resaleStartPrice: null,
  },
  {
    id: 7,
    name: 'Mountain View ICity New Cairo',
    areaId: 2,
    developerId: 2,
    developerStartPrice: null,
    resaleStartPrice: 6800000,
  },
  {
    id: 8,
    name: 'Hadayek el Mohandesin',
    areaId: 6,
    developerId: 6,
    developerStartPrice: null,
    resaleStartPrice: 6000000,
  },
  {
    id: 9,
    name: 'Aliva Mountain View Mostakbal City',
    areaId: 7,
    developerId: 2,
    developerStartPrice: 6680763,
    resaleStartPrice: null,
  },
  {
    id: 10,
    name: 'Address East',
    areaId: 2,
    developerId: 6,
    developerStartPrice: null,
    resaleStartPrice: 12000000,
  },
  {
    id: 11,
    name: 'Crystalline - Silversands',
    areaId: 8,
    developerId: 7,
    developerStartPrice: 27000000,
    resaleStartPrice: null,
  },
  {
    id: 12,
    name: 'Golf Town',
    areaId: 9,
    developerId: 8,
    developerStartPrice: 9627000,
    resaleStartPrice: null,
  },
  {
    id: 13,
    name: 'Clubside Apartments District 5',
    areaId: 10,
    developerId: 4,
    developerStartPrice: 23725000,
    resaleStartPrice: null,
  },
  {
    id: 14,
    name: 'Isola Quattro',
    areaId: 2,
    developerId: 9,
    developerStartPrice: null,
    resaleStartPrice: 4230000,
  },
  {
    id: 15,
    name: 'Crescent Walk - Central Parcel',
    areaId: 9,
    developerId: 4,
    developerStartPrice: 25244000,
    resaleStartPrice: null,
  },
  {
    id: 16,
    name: 'Sawary',
    areaId: 11,
    developerId: 10,
    developerStartPrice: 9037000,
    resaleStartPrice: null,
  },
  {
    id: 17,
    name: 'Taj City',
    areaId: 2,
    developerId: 11,
    developerStartPrice: 9544031,
    resaleStartPrice: null,
  },
];

const amenities: Pick<Amenity, 'id' | 'name'>[] = [
  { id: 1, name: 'Sea View' },
  { id: 2, name: 'Clubhouse' },
  { id: 3, name: 'Outdoor Pools' },
  { id: 4, name: 'Sports Clubs' },
  { id: 5, name: 'Garden' },
  { id: 6, name: 'Underground Parking' },
  { id: 7, name: 'Schools' },
  { id: 8, name: 'Mosque' },
];

type PaymentPlanSeed = Pick<
  PaymentPlan,
  'downPaymentPct' | 'termMonths' | 'installmentAmount' | 'installmentFrequency'
>;

interface ApartmentSeed {
  id: number;
  referenceNo: string;
  title: string;
  description: string;
  imageUrl: string;
  status: ApartmentStatus;
  saleType: SaleType;
  finishing: Finishing;
  price: number;
  areaSqm: number;
  bedrooms: number;
  bathrooms: number;
  floor: number;
  deliveryDate: string | null;
  compoundId: number;
  maintenanceFee: number | null;
  mapLat: number;
  mapLng: number;
  amenityIds: number[];
  plan: PaymentPlanSeed | null;
}

const apartments: ApartmentSeed[] = [
  {
    id: 1,
    referenceNo: 'NWY-100001',
    title: 'Apartment in PX',
    description:
      'Apartment for sale in PX - with 3 bedrooms in 6th of October City by Palm Hills Developments.',
    imageUrl: `/unlockedProperties/132718/351a3bd0-8754-4f63-9829-e621e18cb092/default.webp`,
    status: ApartmentStatus.ReadyToMove,
    saleType: SaleType.Resale,
    finishing: Finishing.FullyFinished,
    price: 20300000,
    areaSqm: 148,
    bedrooms: 3,
    bathrooms: 3,
    floor: 4,
    deliveryDate: null,
    compoundId: 1,
    maintenanceFee: null,
    mapLat: 29.9187,
    mapLng: 30.9425,
    amenityIds: [2, 3, 6],
    plan: {
      downPaymentPct: 10,
      termMonths: 35,
      installmentAmount: 3003429,
      installmentFrequency: InstallmentFrequency.SemiAnnually,
    },
  },
  {
    id: 2,
    referenceNo: 'NWY-100002',
    title: 'Apartment in Mountain View Hyde Park',
    description:
      'Apartment for sale in Mountain View Hyde Park - with 3 bedrooms in New Cairo by Mountain View.',
    imageUrl: `/unlockedProperties/132719/f21b8600-c671-4576-ab85-d2f6693260ca/default.webp`,
    status: ApartmentStatus.ReadyToMove,
    saleType: SaleType.Resale,
    finishing: Finishing.FullyFinished,
    price: 14000000,
    areaSqm: 208,
    bedrooms: 3,
    bathrooms: 3,
    floor: 2,
    deliveryDate: null,
    compoundId: 2,
    maintenanceFee: null,
    mapLat: 30.0286,
    mapLng: 31.4964,
    amenityIds: [2, 4, 5],
    plan: null,
  },
  {
    id: 3,
    referenceNo: 'NWY-100003',
    title: 'Apartment in Al Maqsad',
    description:
      'Apartment for sale in Al Maqsad - with 3 bedrooms in New Capital City by City Edge Developments.',
    imageUrl: `/unlockedProperties/132720/9d6d3e5f-13fa-4f62-b322-da3ec1441d1c/default.webp`,
    status: ApartmentStatus.NearDelivery,
    saleType: SaleType.DeveloperSale,
    finishing: Finishing.SemiFinished,
    price: 6345000,
    areaSqm: 168,
    bedrooms: 3,
    bathrooms: 3,
    floor: 6,
    deliveryDate: '2028-12-31',
    compoundId: 3,
    maintenanceFee: 45000,
    mapLat: 30.0131,
    mapLng: 31.7469,
    amenityIds: [2, 7, 8],
    plan: {
      downPaymentPct: 10,
      termMonths: 47,
      installmentAmount: 114255,
      installmentFrequency: InstallmentFrequency.Quarterly,
    },
  },
  {
    id: 4,
    referenceNo: 'NWY-100004',
    title: 'Apartment in AEON Towers',
    description:
      'Apartment for sale in AEON Towers - with 1 bedroom in 6th of October City by Marakez.',
    imageUrl: `/unlockedProperties/132721/38c6d822-9e6b-4325-934b-b88015d40edc/default.webp`,
    status: ApartmentStatus.ReadyToMove,
    saleType: SaleType.Resale,
    finishing: Finishing.FullyFinished,
    price: 12500000,
    areaSqm: 100,
    bedrooms: 1,
    bathrooms: 2,
    floor: 12,
    deliveryDate: null,
    compoundId: 4,
    maintenanceFee: null,
    mapLat: 29.9553,
    mapLng: 30.931,
    amenityIds: [6, 3],
    plan: null,
  },
  {
    id: 5,
    referenceNo: 'NWY-100005',
    title: 'Apartment in Jirian - Mountain View',
    description:
      'Apartment for sale in Jirian - Mountain View - with 2 bedrooms in New Zayed by Mountain View.',
    imageUrl: `/unlockedProperties/132722/2b731d39-c7f4-4c5d-9dfe-6151ef27a01c/default.webp`,
    status: ApartmentStatus.Launch,
    saleType: SaleType.DeveloperSale,
    finishing: Finishing.Unfinished,
    price: 12150000,
    areaSqm: 110,
    bedrooms: 2,
    bathrooms: 3,
    floor: 0,
    deliveryDate: '2032-06-30',
    compoundId: 5,
    maintenanceFee: null,
    mapLat: 30.0091,
    mapLng: 30.9631,
    amenityIds: [2, 5],
    plan: {
      downPaymentPct: 10,
      termMonths: 78,
      installmentAmount: 769231,
      installmentFrequency: InstallmentFrequency.SemiAnnually,
    },
  },
  {
    id: 6,
    referenceNo: 'NWY-100006',
    title: 'Apartment in Bloom Island - Ogami',
    description:
      'Apartment for sale in Bloom Island - Ogami - with 3 bedrooms in Ras El Hekma by SODIC.',
    imageUrl: `/brochure_images/SODIC/bloomislandogami/Screenshot%202026-08-03%20141934/default.webp`,
    status: ApartmentStatus.New,
    saleType: SaleType.DeveloperSale,
    finishing: Finishing.Unfinished,
    price: 30049000,
    areaSqm: 161,
    bedrooms: 3,
    bathrooms: 4,
    floor: 3,
    deliveryDate: '2033-12-31',
    compoundId: 6,
    maintenanceFee: null,
    mapLat: 31.1264,
    mapLng: 28.0472,
    amenityIds: [1, 3, 2],
    plan: {
      downPaymentPct: 10,
      termMonths: 84,
      installmentAmount: 992690,
      installmentFrequency: InstallmentFrequency.Quarterly,
    },
  },
  {
    id: 7,
    referenceNo: 'NWY-100007',
    title: 'Apartment in Mountain View ICity New Cairo',
    description:
      'Apartment for sale in Mountain View ICity New Cairo - with 3 bedrooms in New Cairo by Mountain View.',
    imageUrl: `/unlockedProperties/132742/c7e63073-e1c5-4198-b44c-740df52bee18/default.webp`,
    status: ApartmentStatus.ReadyToMove,
    saleType: SaleType.Resale,
    finishing: Finishing.FullyFinished,
    price: 6800000,
    areaSqm: 165,
    bedrooms: 3,
    bathrooms: 3,
    floor: 1,
    deliveryDate: null,
    compoundId: 7,
    maintenanceFee: null,
    mapLat: 30.0234,
    mapLng: 31.5312,
    amenityIds: [4, 5, 7],
    plan: {
      downPaymentPct: 10,
      termMonths: 38,
      installmentAmount: 157895,
      installmentFrequency: InstallmentFrequency.SemiAnnually,
    },
  },
  {
    id: 8,
    referenceNo: 'NWY-100008',
    title: 'Apartment in Hadayek el Mohandesin',
    description:
      'Apartment for sale in Hadayek el Mohandesin - with 2 bedrooms in El Sheikh Zayed by Dorra Group.',
    imageUrl: `/unlockedProperties/132743/e64f35ee-d7f3-462c-b9fa-3812ec8a27b0/default.webp`,
    status: ApartmentStatus.ReadyToMove,
    saleType: SaleType.Resale,
    finishing: Finishing.FullyFinished,
    price: 6000000,
    areaSqm: 122,
    bedrooms: 2,
    bathrooms: 2,
    floor: 5,
    deliveryDate: null,
    compoundId: 8,
    maintenanceFee: null,
    mapLat: 30.0511,
    mapLng: 30.9755,
    amenityIds: [6, 8],
    plan: null,
  },
  {
    id: 9,
    referenceNo: 'NWY-100009',
    title: 'Apartment in Aliva Mountain View Mostakbal City',
    description:
      'Apartment for sale in Aliva Mountain View Mostakbal City - with 3 bedrooms in Mostakbal City by Mountain View.',
    imageUrl: `/unlockedProperties/132744/c13950cb-8901-428b-99de-0c4f19f7f72e/default.webp`,
    status: ApartmentStatus.NearDelivery,
    saleType: SaleType.DeveloperSale,
    finishing: Finishing.SemiFinished,
    price: 6680763,
    areaSqm: 155,
    bedrooms: 3,
    bathrooms: 3,
    floor: 7,
    deliveryDate: '2029-09-30',
    compoundId: 9,
    maintenanceFee: null,
    mapLat: 30.0089,
    mapLng: 31.5987,
    amenityIds: [2, 5],
    plan: {
      downPaymentPct: 10,
      termMonths: 40,
      installmentAmount: 286661,
      installmentFrequency: InstallmentFrequency.Quarterly,
    },
  },
  {
    id: 10,
    referenceNo: 'NWY-100010',
    title: 'Apartment in Address East',
    description:
      'Apartment for sale in Address East - with 3 bedrooms in New Cairo by Dorra Group.',
    imageUrl: `/unlockedProperties/132750/2fac94ad-37f2-41a9-aa7c-9dd9bced64fc/default.webp`,
    status: ApartmentStatus.ReadyToMove,
    saleType: SaleType.Resale,
    finishing: Finishing.FullyFinished,
    price: 12000000,
    areaSqm: 167,
    bedrooms: 3,
    bathrooms: 2,
    floor: 3,
    deliveryDate: null,
    compoundId: 10,
    maintenanceFee: null,
    mapLat: 30.0198,
    mapLng: 31.4587,
    amenityIds: [2, 4, 6],
    plan: null,
  },
  {
    id: 11,
    referenceNo: 'NWY-100011',
    title: 'Apartment in Golf Town',
    description:
      'Apartment for sale in Golf Town - with 2 bedrooms in 6th settlement by Modon Egypt.',
    imageUrl: `/brochure_images/Modon%20Developments/golftown/golf%20town%20c1/default.webp`,
    status: ApartmentStatus.Launch,
    saleType: SaleType.DeveloperSale,
    finishing: Finishing.Unfinished,
    price: 9627000,
    areaSqm: 115,
    bedrooms: 2,
    bathrooms: 3,
    floor: 2,
    deliveryDate: '2030-12-31',
    compoundId: 12,
    maintenanceFee: null,
    mapLat: 30.0067,
    mapLng: 31.4498,
    amenityIds: [2, 4, 7],
    plan: {
      downPaymentPct: 10,
      termMonths: 96,
      installmentAmount: 240675,
      installmentFrequency: InstallmentFrequency.Quarterly,
    },
  },
  {
    id: 12,
    referenceNo: 'NWY-100012',
    title: 'Studio in Golf Town',
    description:
      'Apartment for sale in Golf Town - with 2 bedrooms in 6th settlement by Modon Egypt.',
    imageUrl: `/brochure_images/Modon%20Developments/golftown/golf%20town%20c1/default.webp`,
    status: ApartmentStatus.Launch,
    saleType: SaleType.DeveloperSale,
    finishing: Finishing.Unfinished,
    price: 3504000,
    areaSqm: 49,
    bedrooms: 2,
    bathrooms: 1,
    floor: 5,
    deliveryDate: '2030-12-31',
    compoundId: 12,
    maintenanceFee: null,
    mapLat: 30.0067,
    mapLng: 31.4498,
    amenityIds: [2, 4],
    plan: {
      downPaymentPct: 10,
      termMonths: 120,
      installmentAmount: 70080,
      installmentFrequency: InstallmentFrequency.Quarterly,
    },
  },
  {
    id: 13,
    referenceNo: 'NWY-100013',
    title: 'Apartment in Clubside Apartments District 5',
    description:
      'Apartment for sale in Clubside Apartments District 5 - with 3 bedrooms in South New Cairo by Marakez.',
    imageUrl: `/brochure_images/Marakez/clubsideapartmentsdistrict5/Screenshot%202026-07-30%20174738/default.webp`,
    status: ApartmentStatus.New,
    saleType: SaleType.DeveloperSale,
    finishing: Finishing.Unfinished,
    price: 23725000,
    areaSqm: 191,
    bedrooms: 3,
    bathrooms: 3,
    floor: 4,
    deliveryDate: '2031-06-30',
    compoundId: 13,
    maintenanceFee: null,
    mapLat: 30.0089,
    mapLng: 31.5123,
    amenityIds: [2, 5, 6],
    plan: {
      downPaymentPct: 10,
      termMonths: 84,
      installmentAmount: 762589,
      installmentFrequency: InstallmentFrequency.Quarterly,
    },
  },
  {
    id: 14,
    referenceNo: 'NWY-100014',
    title: 'Apartment in Isola Quattro',
    description:
      'Apartment for sale in Isola Quattro - with 2 bedrooms in New Cairo by El Masria Group Developments.',
    imageUrl: `/unlockedProperties/132761/7af20925-3170-4774-9802-130e25efcdc4/default.webp`,
    status: ApartmentStatus.ReadyToMove,
    saleType: SaleType.Resale,
    finishing: Finishing.FullyFinished,
    price: 4230000,
    areaSqm: 100,
    bedrooms: 2,
    bathrooms: 2,
    floor: 6,
    deliveryDate: null,
    compoundId: 14,
    maintenanceFee: null,
    mapLat: 30.0177,
    mapLng: 31.4809,
    amenityIds: [2, 5],
    plan: {
      downPaymentPct: 10,
      termMonths: 98,
      installmentAmount: 92755,
      installmentFrequency: InstallmentFrequency.Quarterly,
    },
  },
  {
    id: 15,
    referenceNo: 'NWY-100015',
    title: 'Apartment in Crescent Walk - Central Parcel',
    description:
      'Apartment for sale in Crescent Walk - Central Parcel - with 3 bedrooms in 6th settlement by Marakez.',
    imageUrl: `/brochure_images/Marakez/crescentwalkcentralparcel/cre%20eas%204/default.webp`,
    status: ApartmentStatus.New,
    saleType: SaleType.DeveloperSale,
    finishing: Finishing.Unfinished,
    price: 25244000,
    areaSqm: 197,
    bedrooms: 3,
    bathrooms: 6,
    floor: 3,
    deliveryDate: '2032-03-31',
    compoundId: 15,
    maintenanceFee: null,
    mapLat: 30.0102,
    mapLng: 31.4677,
    amenityIds: [2, 4, 7],
    plan: {
      downPaymentPct: 10,
      termMonths: 96,
      installmentAmount: 709988,
      installmentFrequency: InstallmentFrequency.Quarterly,
    },
  },
  {
    id: 16,
    referenceNo: 'NWY-100016',
    title: 'Apartment in Crescent Walk - Central Parcel (Type B)',
    description:
      'Apartment for sale in Crescent Walk - Central Parcel - with 3 bedrooms in 6th settlement by Marakez.',
    imageUrl: `/brochure_images/Marakez/crescentwalkcentralparcel/cre%20eas%204/default.webp`,
    status: ApartmentStatus.New,
    saleType: SaleType.DeveloperSale,
    finishing: Finishing.Unfinished,
    price: 24661000,
    areaSqm: 227,
    bedrooms: 3,
    bathrooms: 3,
    floor: 5,
    deliveryDate: '2032-03-31',
    compoundId: 15,
    maintenanceFee: null,
    mapLat: 30.0102,
    mapLng: 31.4677,
    amenityIds: [2, 4, 7],
    plan: {
      downPaymentPct: 10,
      termMonths: 96,
      installmentAmount: 693591,
      installmentFrequency: InstallmentFrequency.Quarterly,
    },
  },
  {
    id: 17,
    referenceNo: 'NWY-100017',
    title: 'Apartment in Sawary',
    description:
      'Apartment for sale in Sawary - with 2 bedrooms in Alexandria by Saudi Egyptian Developers (SED).',
    imageUrl: `/brochure_images/Saudi%20Egyptian%20Developer/sawary/Screenshot%202026-08-19%20152106/default.webp`,
    status: ApartmentStatus.New,
    saleType: SaleType.DeveloperSale,
    finishing: Finishing.SemiFinished,
    price: 9037000,
    areaSqm: 111,
    bedrooms: 2,
    bathrooms: 2,
    floor: 7,
    deliveryDate: '2030-09-30',
    compoundId: 16,
    maintenanceFee: null,
    mapLat: 31.2001,
    mapLng: 29.9187,
    amenityIds: [1, 3, 2],
    plan: {
      downPaymentPct: 10,
      termMonths: 60,
      installmentAmount: 406665,
      installmentFrequency: InstallmentFrequency.Quarterly,
    },
  },
  {
    id: 18,
    referenceNo: 'NWY-100018',
    title: 'Apartment in Sawary (Type B)',
    description:
      'Apartment for sale in Sawary - with 2 bedrooms in Alexandria by Saudi Egyptian Developers (SED).',
    imageUrl: `/brochure_images/Saudi%20Egyptian%20Developer/sawary/Screenshot%202026-08-19%20152106/default.webp`,
    status: ApartmentStatus.New,
    saleType: SaleType.DeveloperSale,
    finishing: Finishing.SemiFinished,
    price: 14013000,
    areaSqm: 142,
    bedrooms: 2,
    bathrooms: 2,
    floor: 9,
    deliveryDate: '2030-09-30',
    compoundId: 16,
    maintenanceFee: null,
    mapLat: 31.2001,
    mapLng: 29.9187,
    amenityIds: [1, 3],
    plan: {
      downPaymentPct: 10,
      termMonths: 60,
      installmentAmount: 630585,
      installmentFrequency: InstallmentFrequency.Quarterly,
    },
  },
  {
    id: 19,
    referenceNo: 'NWY-100019',
    title: 'Apartment in Taj City',
    description:
      'Apartment for sale in Taj City - with 2 bedrooms in New Cairo by Madinet Masr.',
    imageUrl: `/unlockedProperties/132808/67324c49-5a91-465f-9f95-8c752254214f/default.webp`,
    status: ApartmentStatus.NearDelivery,
    saleType: SaleType.DeveloperSale,
    finishing: Finishing.SemiFinished,
    price: 9544031,
    areaSqm: 117,
    bedrooms: 2,
    bathrooms: 1,
    floor: 8,
    deliveryDate: '2029-06-30',
    compoundId: 17,
    maintenanceFee: 30000,
    mapLat: 30.0356,
    mapLng: 31.4912,
    amenityIds: [2, 7, 5],
    plan: {
      downPaymentPct: 10,
      termMonths: 100,
      installmentAmount: 201334,
      installmentFrequency: InstallmentFrequency.Quarterly,
    },
  },
  {
    id: 20,
    referenceNo: 'NWY-100020',
    title: 'Apartment in Mountain View ICity New Cairo (2BR)',
    description:
      'Apartment for sale in Mountain View ICity New Cairo - with 2 bedrooms in New Cairo by Mountain View.',
    imageUrl: `/unlockedProperties/132806/c082736f-d17d-49ce-8120-aca584bf472e/default.webp`,
    status: ApartmentStatus.ReadyToMove,
    saleType: SaleType.Resale,
    finishing: Finishing.FullyFinished,
    price: 7305000,
    areaSqm: 125,
    bedrooms: 2,
    bathrooms: 2,
    floor: 4,
    deliveryDate: null,
    compoundId: 7,
    maintenanceFee: null,
    mapLat: 30.0234,
    mapLng: 31.5312,
    amenityIds: [4, 5, 7],
    plan: {
      downPaymentPct: 10,
      termMonths: 46,
      installmentAmount: 80667,
      installmentFrequency: InstallmentFrequency.SemiAnnually,
    },
  },
];

// Tables seeded with explicit ids; their SERIAL sequences must be realigned so
// later inserts (e.g. POST /apartments) don't collide with seeded ids.
const SEQUENCE_TABLES = [
  'developers',
  'areas',
  'compounds',
  'amenities',
  'apartments',
];

export default class InitialSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const existing = await dataSource.getRepository(Apartment).count();
    if (existing > 0) {
      return;
    }

    await dataSource.transaction(async (manager) => {
      await manager.getRepository(Developer).insert(developers);
      await manager.getRepository(Area).insert(areas);
      await manager.getRepository(Compound).insert(compounds);
      await manager.getRepository(Amenity).insert(amenities);

      await manager.getRepository(Apartment).insert(
        apartments.map((a) => ({
          id: a.id,
          referenceNo: a.referenceNo,
          title: a.title,
          description: a.description,
          imageUrl: a.imageUrl,
          status: a.status,
          saleType: a.saleType,
          finishing: a.finishing,
          price: a.price,
          currency: Currency.EGP,
          areaSqm: a.areaSqm,
          bedrooms: a.bedrooms,
          bathrooms: a.bathrooms,
          floor: a.floor,
          deliveryDate: a.deliveryDate,
          compoundId: a.compoundId,
          maintenanceFee: a.maintenanceFee,
          mapLat: a.mapLat,
          mapLng: a.mapLng,
        })),
      );

      const plans = apartments
        .filter((a) => a.plan !== null)
        .map((a) => ({
          apartmentId: a.id,
          downPaymentPct: a.plan!.downPaymentPct,
          termMonths: a.plan!.termMonths,
          installmentAmount: a.plan!.installmentAmount,
          installmentFrequency: a.plan!.installmentFrequency,
        }));
      await manager.getRepository(PaymentPlan).insert(plans);

      for (const a of apartments) {
        await manager
          .createQueryBuilder()
          .relation(Apartment, 'amenities')
          .of(a.id)
          .add(a.amenityIds);
      }

      await this.realignSequences(manager);
    });
  }

  private async realignSequences(manager: EntityManager): Promise<void> {
    for (const table of SEQUENCE_TABLES) {
      await manager.query(
        `SELECT setval(pg_get_serial_sequence('${table}', 'id'), (SELECT MAX(id) FROM "${table}"))`,
      );
    }
  }
}
