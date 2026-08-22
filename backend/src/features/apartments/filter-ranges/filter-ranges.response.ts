import { ApiProperty } from '@nestjs/swagger';

export class RangeBound {
  @ApiProperty({ nullable: true, example: 3504000 })
  min: number | null;

  @ApiProperty({ nullable: true, example: 30049000 })
  max: number | null;

  constructor(min: number | null, max: number | null) {
    this.min = min;
    this.max = max;
  }
}

/**
 * Data-driven bounds for the range filters. The client turns each {min, max}
 * into stepped dropdown options, so a filter can never offer a value the data
 * has no apartment for.
 */
export class FilterRangesResponse {
  @ApiProperty({ type: RangeBound })
  price: RangeBound;

  @ApiProperty({ type: RangeBound })
  area: RangeBound;

  @ApiProperty({ type: RangeBound })
  bedrooms: RangeBound;

  @ApiProperty({ type: RangeBound })
  bathrooms: RangeBound;

  constructor(
    price: RangeBound,
    area: RangeBound,
    bedrooms: RangeBound,
    bathrooms: RangeBound,
  ) {
    this.price = price;
    this.area = area;
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
  }
}
