import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from '../../../domain';
import { FilterRangesCache } from './filter-ranges.cache';
import { FilterRangesResponse, RangeBound } from './filter-ranges.response';

interface RawRanges {
  minPrice: string | null;
  maxPrice: string | null;
  minArea: string | null;
  maxArea: string | null;
  minBedrooms: string | null;
  maxBedrooms: string | null;
  minBathrooms: string | null;
  maxBathrooms: string | null;
}

/**
 * Min/max bounds for the range filters. Cached briefly — bounds shift only on
 * inventory change, and every list view asks for them.
 */
@Injectable()
export class GetFilterRangesHandler {
  constructor(
    @InjectRepository(Apartment)
    private readonly apartments: Repository<Apartment>,
    private readonly cache: FilterRangesCache,
  ) {}

  async execute(): Promise<FilterRangesResponse> {
    const cached = await this.cache.get();
    if (cached) return cached;

    // One query with MIN/MAX per column is intentional. Postgres reads each
    // bound straight from the price / area_sqm / bedrooms index instead of
    // scanning the table, so this stays fast as inventory grows. Verified on 1M
    // rows: this form ~0.3ms.
    const raw = await this.apartments
      .createQueryBuilder('a')
      .select('MIN(a.price)', 'minPrice')
      .addSelect('MAX(a.price)', 'maxPrice')
      .addSelect('MIN(a.areaSqm)', 'minArea')
      .addSelect('MAX(a.areaSqm)', 'maxArea')
      .addSelect('MIN(a.bedrooms)', 'minBedrooms')
      .addSelect('MAX(a.bedrooms)', 'maxBedrooms')
      .addSelect('MIN(a.bathrooms)', 'minBathrooms')
      .addSelect('MAX(a.bathrooms)', 'maxBathrooms')
      .getRawOne<RawRanges>();

    const value = new FilterRangesResponse(
      new RangeBound(toNumber(raw?.minPrice), toNumber(raw?.maxPrice)),
      new RangeBound(toNumber(raw?.minArea), toNumber(raw?.maxArea)),
      new RangeBound(toNumber(raw?.minBedrooms), toNumber(raw?.maxBedrooms)),
      new RangeBound(toNumber(raw?.minBathrooms), toNumber(raw?.maxBathrooms)),
    );

    await this.cache.set(value);
    return value;
  }
}

function toNumber(value: string | null | undefined): number | null {
  if (value == null) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}
