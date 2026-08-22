import { ApiProperty } from '@nestjs/swagger';

export class CreateApartmentResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'NWY-100001' })
  referenceNo: string;
}
