import { ApiProperty } from '@nestjs/swagger';

export class ShoppingCartItem {
  @ApiProperty({ example: 3 })
  id: number;

  @ApiProperty({ example: 4 })
  userId: number;

  @ApiProperty({ example: 143 })
  machineId: number;

  @ApiProperty({ example: 'MUST' })
  machine_manufacturer: string;

  @ApiProperty({ example: 'CШA' })
  country_manufacturer: string;

  @ApiProperty({ example: 21312 })
  price: number;

  @ApiProperty({ example: 'Quae veritatis sequi.' })
  name: string;

  @ApiProperty({
    example: 'https://loremflickr.com/640/480/technics?lock=2173441461452800',
  })
  image: string;

  @ApiProperty({ example: 22 })
  in_stock: number;

  @ApiProperty({ example: 0 })
  count: number;

  @ApiProperty({ example: 123122 })
  total_price: number;

  @ApiProperty({ example: '2023-05-16T15:10:31.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-05-16T15:10:31.000Z' })
  updatedAt: string;
}

export class GetAllResponse extends ShoppingCartItem {}

export class AddToCartResponse extends ShoppingCartItem {}

export class UpdateCountResponse {
  @ApiProperty({ example: 1 })
  count: number;
}
export class UpdateCountRequest {
  @ApiProperty({ example: 1 })
  count: number;
}

export class UpdateTotalPriceResponse {
  @ApiProperty({ example: 777271 })
  total_price: number;
}
export class UpdateTotalPriceRequest {
  @ApiProperty({ example: 777271 })
  total_price: number;
}
