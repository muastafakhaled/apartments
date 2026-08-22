export * from './enums';
export * from './developer.entity';
export * from './area.entity';
export * from './compound.entity';
export * from './apartment.entity';
export * from './amenity.entity';
export * from './payment-plan.entity';

import { Developer } from './developer.entity';
import { Area } from './area.entity';
import { Compound } from './compound.entity';
import { Apartment } from './apartment.entity';
import { Amenity } from './amenity.entity';
import { PaymentPlan } from './payment-plan.entity';

export const entities = [
  Developer,
  Area,
  Compound,
  Apartment,
  Amenity,
  PaymentPlan,
];
