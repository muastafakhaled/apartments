import { DataSource } from 'typeorm';
import {
  Amenity,
  Apartment,
  Area,
  Compound,
  Developer,
  PaymentPlan,
} from '../../../../domain';
import {
  buildAmenity,
  buildApartment,
  buildArea,
  buildCompound,
  buildDeveloper,
  buildPaymentPlan,
} from '../../../../test/factories';

export interface SeededApartmentDetail {
  apartmentId: number;
  referenceNo: string;
  compoundName: string;
  areaName: string;
  developerName: string;
  amenityNames: string[];
  imageUrl: string;
}

/**
 * Seeds one fully-populated apartment graph — compound → area/developer, two
 * amenities, and a payment plan — exercising every relation the detail handler
 * loads.
 */
export async function seedApartmentDetail(
  ds: DataSource,
): Promise<SeededApartmentDetail> {
  const developer = await ds
    .getRepository(Developer)
    .save(buildDeveloper({ name: 'Palm Hills Developments' }));
  const area = await ds
    .getRepository(Area)
    .save(buildArea({ name: 'New Cairo' }));
  const compound = await ds
    .getRepository(Compound)
    .save(buildCompound({ name: 'PX', area, developer }));
  const amenities = await ds
    .getRepository(Amenity)
    .save([buildAmenity({ name: 'Pool' }), buildAmenity({ name: 'Gym' })]);

  const imageUrl = '/gallery/px-1.webp';
  const apartment = await ds.getRepository(Apartment).save(
    buildApartment({
      title: 'Apartment in PX',
      referenceNo: 'NWY-100001',
      compound,
      amenities,
      imageUrl,
    }),
  );

  await ds
    .getRepository(PaymentPlan)
    .save(buildPaymentPlan({ apartmentId: apartment.id }));

  return {
    apartmentId: apartment.id,
    referenceNo: apartment.referenceNo,
    compoundName: 'PX',
    areaName: 'New Cairo',
    developerName: 'Palm Hills Developments',
    amenityNames: ['Pool', 'Gym'],
    imageUrl,
  };
}
