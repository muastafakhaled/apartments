import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from '../../domain';
import { MediaModule } from '../../shared/media/media.module';
import { ApartmentsController } from './apartments.controller';
import { CreateApartmentHandler } from './create-apartment/create-apartment.handler';
import { CreateApartmentMapper } from './create-apartment/create-apartment.mapper';
import { ReferenceNoGenerator } from './create-apartment/reference-no.generator';
import { FilterRangesCache } from './filter-ranges/filter-ranges.cache';
import { GetFilterRangesHandler } from './filter-ranges/filter-ranges.handler';
import { GetApartmentHandler } from './get-apartment/get-apartment.handler';
import { ApartmentDetailMapper } from './get-apartment/get-apartment.mapper';
import { ListApartmentsHandler } from './list-apartments/list-apartments.handler';
import { ApartmentListMapper } from './list-apartments/list-apartments.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([Apartment]),
    MediaModule,
    CacheModule.register(),
  ],
  controllers: [ApartmentsController],
  providers: [
    ListApartmentsHandler,
    ApartmentListMapper,
    GetFilterRangesHandler,
    FilterRangesCache,
    GetApartmentHandler,
    ApartmentDetailMapper,
    CreateApartmentHandler,
    CreateApartmentMapper,
    ReferenceNoGenerator,
  ],
})
export class ApartmentsModule {}
