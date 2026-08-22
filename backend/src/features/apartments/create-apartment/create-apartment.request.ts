import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  ApartmentStatus,
  Currency,
  Finishing,
  InstallmentFrequency,
  SaleType,
} from '../../../domain';

export class CreatePaymentPlanRequest {
  @ApiPropertyOptional({ minimum: 0, maximum: 100, example: 10 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  downPaymentPct?: number;

  @ApiPropertyOptional({ minimum: 1, example: 96 })
  @IsOptional()
  @IsInt()
  @Min(1)
  termMonths?: number;

  @ApiPropertyOptional({ minimum: 0, example: 125000 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  installmentAmount?: number;

  @ApiPropertyOptional({ enum: InstallmentFrequency })
  @IsOptional()
  @IsEnum(InstallmentFrequency)
  installmentFrequency?: InstallmentFrequency;
}

export class CreateApartmentRequest {
  @ApiProperty({ maxLength: 255, example: 'Apartment in PX' })
  @IsString()
  @Length(1, 255)
  title: string;

  @ApiProperty({ example: 'Spacious apartment with garden view' })
  @IsString()
  @Length(1, 5000)
  description: string;

  @ApiProperty({
    maxLength: 500,
    description: 'Path/key of the cover image within the media store',
    example: 'apartments/1/thumb.webp',
  })
  @IsString()
  @Length(1, 500)
  imageUrl: string;

  @ApiPropertyOptional({ enum: ApartmentStatus, default: ApartmentStatus.New })
  @IsOptional()
  @IsEnum(ApartmentStatus)
  status?: ApartmentStatus;

  @ApiProperty({ enum: SaleType })
  @IsEnum(SaleType)
  saleType: SaleType;

  @ApiProperty({ enum: Finishing })
  @IsEnum(Finishing)
  finishing: Finishing;

  @ApiProperty({ minimum: 0, example: 20300000 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @ApiPropertyOptional({ enum: Currency, default: Currency.EGP })
  @IsOptional()
  @IsEnum(Currency)
  currency?: Currency;

  @ApiProperty({ minimum: 0, example: 148 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  areaSqm: number;

  @ApiProperty({ minimum: 0, example: 3 })
  @IsInt()
  @Min(0)
  bedrooms: number;

  @ApiProperty({ minimum: 0, example: 3 })
  @IsInt()
  @Min(0)
  bathrooms: number;

  // Ground floor is 0; basements are negative.
  @ApiProperty({ example: 5 })
  @IsInt()
  floor: number;

  @ApiProperty({ minimum: 1, example: 1 })
  @IsInt()
  @IsPositive()
  compoundId: number;

  @ApiProperty({ example: 29.972 })
  @IsLatitude()
  mapLat: number;

  @ApiProperty({ example: 30.945 })
  @IsLongitude()
  mapLng: number;

  @ApiPropertyOptional({ format: 'date', example: '2028-12-31' })
  @IsOptional()
  @IsString()
  deliveryDate?: string;

  @ApiPropertyOptional({ minimum: 0, example: 50000 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  maintenanceFee?: number;

  @ApiPropertyOptional({ type: Number, isArray: true, example: [1, 2] })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  amenityIds?: number[];

  @ApiPropertyOptional({ type: CreatePaymentPlanRequest, isArray: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePaymentPlanRequest)
  paymentPlans?: CreatePaymentPlanRequest[];
}
