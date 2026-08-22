import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ApiBaseResponse } from '../../shared/http/api-base-response.decorator';
import { CreateApartmentHandler } from './create-apartment/create-apartment.handler';
import { CreateApartmentRequest } from './create-apartment/create-apartment.request';
import { CreateApartmentResponse } from './create-apartment/create-apartment.response';
import { GetFilterRangesHandler } from './filter-ranges/filter-ranges.handler';
import { FilterRangesResponse } from './filter-ranges/filter-ranges.response';
import { GetApartmentHandler } from './get-apartment/get-apartment.handler';
import { ApartmentDetailResponse } from './get-apartment/get-apartment.response';
import { ListApartmentsHandler } from './list-apartments/list-apartments.handler';
import { ListApartmentsRequest } from './list-apartments/list-apartments.request';
import { ListApartmentsResponse } from './list-apartments/list-apartments.response';

@ApiTags('apartments')
@Controller('apartments')
export class ApartmentsController {
  constructor(
    private readonly listApartments: ListApartmentsHandler,
    private readonly getFilterRanges: GetFilterRangesHandler,
    private readonly getApartment: GetApartmentHandler,
    private readonly createApartment: CreateApartmentHandler,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create an apartment' })
  @ApiBaseResponse(CreateApartmentResponse, { status: 201 })
  @ApiUnprocessableEntityResponse({
    description: 'A referenced compound or amenity does not exist',
  })
  create(
    @Body() body: CreateApartmentRequest,
  ): Promise<CreateApartmentResponse> {
    return this.createApartment.execute(body);
  }

  @Get()
  @ApiOperation({ summary: 'List apartments' })
  @ApiBaseResponse(ListApartmentsResponse)
  list(@Query() query: ListApartmentsRequest): Promise<ListApartmentsResponse> {
    return this.listApartments.execute(query);
  }

  @Get('filters')
  @ApiOperation({ summary: 'Data-driven bounds for the list range filters' })
  @ApiBaseResponse(FilterRangesResponse)
  filters(): Promise<FilterRangesResponse> {
    return this.getFilterRanges.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get apartment details by id' })
  @ApiBaseResponse(ApartmentDetailResponse)
  @ApiNotFoundResponse({ description: 'Apartment not found' })
  get(@Param('id', ParseIntPipe) id: number): Promise<ApartmentDetailResponse> {
    return this.getApartment.execute(id);
  }
}
