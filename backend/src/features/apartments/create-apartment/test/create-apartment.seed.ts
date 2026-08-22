import { DataSource } from 'typeorm';
import { Amenity, Area, Compound, Developer } from '../../../../domain';
import {
  buildAmenity,
  buildArea,
  buildCompound,
  buildDeveloper,
} from '../../../../test/factories';

export interface SeededCreateRefs {
  compoundId: number;
  amenityIds: number[];
}

/** Seeds the reference rows a create request must point at (compound, amenities). */
export async function seedCreateRefs(
  ds: DataSource,
): Promise<SeededCreateRefs> {
  const developer = await ds.getRepository(Developer).save(buildDeveloper());
  const area = await ds.getRepository(Area).save(buildArea());
  const compound = await ds
    .getRepository(Compound)
    .save(buildCompound({ area, developer }));
  const amenities = await ds
    .getRepository(Amenity)
    .save([buildAmenity({ name: 'Pool' }), buildAmenity({ name: 'Gym' })]);

  return {
    compoundId: compound.id,
    amenityIds: amenities.map((a) => a.id),
  };
}
