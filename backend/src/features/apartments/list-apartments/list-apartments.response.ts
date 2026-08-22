import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '../../../domain';
import { PaginationMeta } from '../../../shared/dto/paginated.response';

export class ApartmentListItem {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'NWY-100001' })
  referenceNo: string;

  @ApiProperty({ example: 'Apartment in PX' })
  title: string;

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

  @ApiProperty({ nullable: true, example: 'Ready to Move' })
  status: string | null;

  @ApiProperty({ nullable: true, example: 'Resale' })
  saleType: string | null;

  @ApiProperty({ nullable: true, example: 'Fully Finished' })
  finishing: string | null;

  @ApiProperty({ nullable: true, example: '2028-12-31' })
  deliveryDate: string | null;

  @ApiProperty({ nullable: true, example: 'PX' })
  compound: string | null;

  @ApiProperty({ nullable: true, example: '6th of October City' })
  area: string | null;

  @ApiProperty({ nullable: true, example: 'Palm Hills Developments' })
  developer: string | null;

  @ApiProperty({ example: 'https://.../default.webp' })
  imageUrl: string;
}

export class ListApartmentsResponse {
  @ApiProperty({ type: ApartmentListItem, isArray: true })
  items: ApartmentListItem[];

  @ApiProperty({ type: PaginationMeta })
  meta: PaginationMeta;

  constructor(items: ApartmentListItem[], meta: PaginationMeta) {
    this.items = items;
    this.meta = meta;
  }
}
