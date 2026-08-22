import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApartmentStatus, Finishing, SaleType } from '../../../domain';

export class ListApartmentsRequest {
  @ApiPropertyOptional({ enum: SaleType, description: 'Filter by sale type' })
  @IsOptional()
  @IsEnum(SaleType)
  saleType?: SaleType;

  @ApiPropertyOptional({ enum: Finishing, description: 'Filter by finishing' })
  @IsOptional()
  @IsEnum(Finishing)
  finishing?: Finishing;

  @ApiPropertyOptional({
    enum: ApartmentStatus,
    description: 'Filter by status',
  })
  @IsOptional()
  @IsEnum(ApartmentStatus)
  status?: ApartmentStatus;

  @ApiPropertyOptional({
    minimum: 1,
    example: 2,
    description: 'Minimum number of bedrooms',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  minBedrooms?: number;

  @ApiPropertyOptional({
    minimum: 1,
    example: 2,
    description: 'Minimum number of bathrooms',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  minBathrooms?: number;

  @ApiPropertyOptional({ minimum: 0, description: 'Minimum price' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ minimum: 0, description: 'Maximum price' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ minimum: 0, description: 'Minimum area (sqm)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minArea?: number;

  @ApiPropertyOptional({ minimum: 0, description: 'Maximum area (sqm)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxArea?: number;

  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ minimum: 1, maximum: 50, default: 12 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 12;
}
