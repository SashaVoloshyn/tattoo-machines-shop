import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class TattooMachine extends Model {
  @Column
  machine_manufacturer: string;

  @Column
  country_manufacturer: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  vendor_code: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  color: string;

  @Column
  weight: number;

  @Column
  images: string;

  @Column
  material: string;

  @Column({ defaultValue: 0 })
  in_stock: number;

  @Column({ defaultValue: false })
  bestseller: boolean;

  @Column({ defaultValue: false })
  new: boolean;

  @Column
  needle_stroke: number;

  @Column
  type: string;

  @Column
  popularity: number;
}
