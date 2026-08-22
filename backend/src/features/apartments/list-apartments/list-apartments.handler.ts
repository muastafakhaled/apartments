import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOperator,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Apartment, Compound } from '../../../domain';
import { PaginationMeta } from '../../../shared/dto/paginated.response';
import { ApartmentListMapper } from './list-apartments.mapper';
import { ListApartmentsRequest } from './list-apartments.request';
import { ListApartmentsResponse } from './list-apartments.response';

@Injectable()
export class ListApartmentsHandler {
  constructor(
    @InjectRepository(Apartment)
    private readonly apartments: Repository<Apartment>,
    private readonly mapper: ApartmentListMapper,
  ) {}

  async execute(query: ListApartmentsRequest): Promise<ListApartmentsResponse> {
    const { page, limit } = query;

    const [rows, total] = await this.apartments.findAndCount({
      where: this.buildWhere(query),
      relations: { compound: { area: true, developer: true } },
      order: { id: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const items = rows.map((row) => this.mapper.toItem(row));
    const meta = new PaginationMeta(page, limit, total);

    return new ListApartmentsResponse(items, meta);
  }

  private buildWhere(
    query: ListApartmentsRequest,
  ): FindOptionsWhere<Apartment> {
    const where: FindOptionsWhere<Apartment> = {};

    if (query.saleType) where.saleType = query.saleType;
    if (query.finishing) where.finishing = query.finishing;
    if (query.status) where.status = query.status;
    if (query.minBedrooms != null) {
      where.bedrooms = MoreThanOrEqual(query.minBedrooms);
    }
    if (query.minBathrooms != null) {
      where.bathrooms = MoreThanOrEqual(query.minBathrooms);
    }

    const price = rangeOperator(query.minPrice, query.maxPrice);
    if (price) where.price = price;

    const area = rangeOperator(query.minArea, query.maxArea);
    if (area) where.areaSqm = area;

    const compound: FindOptionsWhere<Compound> = {};
    if (query.compound) compound.name = query.compound;
    if (query.area) compound.area = { name: query.area };
    if (query.developer) compound.developer = { name: query.developer };
    if (Object.keys(compound).length > 0) where.compound = compound;

    return where;
  }
}

function rangeOperator(
  min?: number,
  max?: number,
): FindOperator<number> | undefined {
  if (min != null && max != null) return Between(min, max);
  if (min != null) return MoreThanOrEqual(min);
  if (max != null) return LessThanOrEqual(max);
  return undefined;
}
