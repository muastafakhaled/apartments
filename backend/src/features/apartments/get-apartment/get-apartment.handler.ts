import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from '../../../domain';
import { ResourceNotFoundError } from '../../../shared/http/domain-exception';
import { ApartmentDetailMapper } from './get-apartment.mapper';
import { ApartmentDetailResponse } from './get-apartment.response';

@Injectable()
export class GetApartmentHandler {
  constructor(
    @InjectRepository(Apartment)
    private readonly apartments: Repository<Apartment>,
    private readonly mapper: ApartmentDetailMapper,
  ) {}

  async execute(id: number): Promise<ApartmentDetailResponse> {
    const apartment = await this.apartments.findOne({
      where: { id },
      relations: {
        compound: { area: true, developer: true },
        amenities: true,
        paymentPlans: true,
      },
      relationLoadStrategy: 'query',
    });

    if (!apartment) {
      throw new ResourceNotFoundError(`Apartment ${id} not found`);
    }

    return this.mapper.toResponse(apartment);
  }
}
