import { ApiProperty } from '@nestjs/swagger';
import { Op } from 'sequelize';

export interface ITattooMachinesQuery {
  limit: string;
  offset: string;
}

export class TattooMachines {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'MUST' })
  machine_manufacturer: string;

  @ApiProperty({ example: 'США' })
  country_manufacturer: string;

  @ApiProperty({ example: 9999 })
  price: number;

  @ApiProperty({ example: 'uhi352#xczl5' })
  vendor_code: string;

  @ApiProperty({ example: 'Quae veritatis sequi.' })
  name: string;

  @ApiProperty({
    example:
      'Quae veritatis sequi.Quae veritatis sequi.Quae veritatis sequi.Quae veritatis sequi.Quae veritatis sequi.',
  })
  description: string;

  @ApiProperty({ example: 'чорний' })
  color: string;

  @ApiProperty({ example: 118 })
  weight: number;

  @ApiProperty({
    example:
      '[\\"https://loremflickr.com/640/480/technics?lock=7211674327056384\\",\\"https://loremflickr.com/640/480/technics?lock=6076237975912448\\",\\"https://loremflickr.com/640/480/technics?lock=2761735691829248\\]',
  })
  images: string;

  @ApiProperty({ example: 'Алюміній' })
  material: string;

  @ApiProperty({ example: 33 })
  in_stock: number;

  @ApiProperty({ example: 3 })
  needle_stroke: number;

  @ApiProperty({ example: 777 })
  popularity: number;

  @ApiProperty({ example: 'Універсальна' })
  type: string;

  @ApiProperty({ example: false })
  bestseller: boolean;

  @ApiProperty({ example: true })
  new: boolean;

  @ApiProperty({ example: '2023-05-15T15:10:11.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-05-15T15:10:11.000Z' })
  updatedAt: string;
}

export class PaginateAndFilterResponse {
  @ApiProperty({ example: 200 })
  count: number;

  @ApiProperty({ type: TattooMachines, isArray: true })
  rows: TattooMachines;
}

export class Bestsellers extends TattooMachines {
  @ApiProperty({ example: true })
  bestseller: boolean;
}

export class GetBestsellersResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 74 })
  count: number;

  @ApiProperty({ type: TattooMachines, isArray: true })
  rows: Bestsellers;
}

export class NewMachines extends TattooMachines {
  @ApiProperty({ example: true })
  new: boolean;
}

export class GetNewResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 43 })
  count: number;

  @ApiProperty({ type: TattooMachines, isArray: true })
  rows: NewMachines;
}

export class SearchByLetter extends TattooMachines {
  @ApiProperty({ example: 'Quae veritatis sequi.' })
  name: string;
}

export class SearchResponse extends PaginateAndFilterResponse {
  @ApiProperty({ type: SearchByLetter, isArray: true })
  rows: SearchByLetter;
}
export class SearchRequest {
  @ApiProperty({ example: 'a' })
  search: string;
}

export class GetByNameResponse extends TattooMachines {
  @ApiProperty({ example: 'Quae veritatis sequi.' })
  name: string;
}
export class GetByNameRequest {
  @ApiProperty({ example: 'Quae veritatis sequi.' })
  name: string;
}

export class FindOneResponse extends TattooMachines {}

export interface ITattooMachinesQuery {
  limit: string;
  offset: string;
  machine: string | undefined;
  country: string | undefined;
  priceFrom: string | undefined;
  priceTo: string | undefined;
}

export interface ITattooMachinesFilter {
  machine_manufacturer: string | undefined;
  country_manufacturer: string | undefined;
  price: { [Op.between]: number[] };
}