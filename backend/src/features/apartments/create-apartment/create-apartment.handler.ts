import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from '../../../domain';
import { FilterRangesCache } from '../filter-ranges/filter-ranges.cache';
import { CreateApartmentMapper } from './create-apartment.mapper';
import { CreateApartmentRequest } from './create-apartment.request';
import { CreateApartmentResponse } from './create-apartment.response';
import { ReferenceNoGenerator } from './reference-no.generator';

@Injectable()
export class CreateApartmentHandler {
  constructor(
    @InjectRepository(Apartment)
    private readonly apartments: Repository<Apartment>,
    private readonly mapper: CreateApartmentMapper,
    private readonly referenceNo: ReferenceNoGenerator,
    private readonly filterRangesCache: FilterRangesCache,
  ) {}

  async execute(
    request: CreateApartmentRequest,
  ): Promise<CreateApartmentResponse> {
    const apartment = this.mapper.toEntity(request);
    apartment.referenceNo = this.referenceNo.generate();
    apartment.amenities = this.mapper.toAmenityRefs(request.amenityIds);
    apartment.paymentPlans = this.mapper.toPaymentPlans(request);

    const saved = await this.apartments.save(apartment);

    // New inventory can move the min/max bounds; drop the stale ranges.
    await this.filterRangesCache.invalidate();

    return { id: saved.id, referenceNo: saved.referenceNo };
  }
}
