import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '../../../domain';

export class PaymentPlanItem {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ nullable: true, example: 10 })
  downPaymentPct: number | null;

  @ApiProperty({ nullable: true, example: 96 })
  termMonths: number | null;

  @ApiProperty({ nullable: true, example: 125000 })
  installmentAmount: number | null;

  @ApiProperty({ nullable: true, example: 'Monthly' })
  installmentFrequency: string | null;
}

export class ApartmentDetailResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'NWY-100001' })
  referenceNo: string;

  @ApiProperty({ example: 'Apartment in PX' })
  title: string;

  @ApiProperty({
    nullable: true,
    example: 'Spacious apartment with garden view',
  })
  description: string | null;

  @ApiProperty({ nullable: true, example: 20300000 })
  price: number | null;

  @ApiProperty({ enum: Currency, example: Currency.EGP })
  currency: Currency;

  @ApiProperty({ nullable: true, example: 148 })
  areaSqm: number | null;

  @ApiProperty({ nullable: true, example: 3 })
  bedrooms: number | null;

  @ApiProperty({ nullable: true, example: 3 })
  bathrooms: number | null;

  @ApiProperty({ nullable: true, example: 5 })
  floor: number | null;

  @ApiProperty({ nullable: true, example: 'Ready to Move' })
  status: string | null;

  @ApiProperty({ nullable: true, example: 'Resale' })
  saleType: string | null;

  @ApiProperty({ nullable: true, example: 'Fully Finished' })
  finishing: string | null;

  @ApiProperty({ nullable: true, example: '2028-12-31' })
  deliveryDate: string | null;

  @ApiProperty({ nullable: true, example: 50000 })
  maintenanceFee: number | null;

  @ApiProperty({ nullable: true, example: 29.972 })
  mapLat: number | null;

  @ApiProperty({ nullable: true, example: 30.945 })
  mapLng: number | null;

  @ApiProperty({ nullable: true, example: 'PX' })
  compound: string | null;

  @ApiProperty({ nullable: true, example: '6th of October City' })
  area: string | null;

  @ApiProperty({ nullable: true, example: 'Palm Hills Developments' })
  developer: string | null;

  @ApiProperty({ type: String, isArray: true, example: ['Pool', 'Gym'] })
  amenities: string[];

  @ApiProperty({ example: 'https://.../default.webp' })
  imageUrl: string;

  @ApiProperty({ type: PaymentPlanItem, isArray: true })
  paymentPlans: PaymentPlanItem[];
}
