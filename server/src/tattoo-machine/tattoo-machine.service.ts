import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TattooMachine } from './tattoo-machine.model';
import { ITattooMachinesFilter, ITattooMachinesQuery } from "./types";
import { Op } from 'sequelize';

@Injectable()
export class TattooMachineService {
  constructor(
    @InjectModel(TattooMachine)
    private tattooMachinesModel: typeof TattooMachine,
  ) {}

  async paginateAndFilter(
    query: ITattooMachinesQuery,
  ): Promise<{ count: number; rows: TattooMachine[] }> {
    const limit = Number(query.limit);
    const offset = Number(query.offset) * 20;
    const filter = {} as  Partial<ITattooMachinesFilter>

    if (query.priceFrom && query.priceTo) {
      filter.price = {
        [Op.between]: [Number(query.priceFrom), Number(query.priceTo)],
      }
    }

    if (query.machine) {
      filter.machine_manufacturer = JSON.parse(decodeURIComponent(query.machine))
    }

    if (query.country) {
      filter.country_manufacturer = JSON.parse(decodeURIComponent(query.country))
    }
    return this.tattooMachinesModel.findAndCountAll({ limit, offset, where:filter });
  }

  async bestsellers(): Promise<{ count: number; rows: TattooMachine[] }> {
    return this.tattooMachinesModel.findAndCountAll({
      where: { bestseller: true },
    });
  }

  async new(): Promise<{ count: number; rows: TattooMachine[] }> {
    return this.tattooMachinesModel.findAndCountAll({
      where: { new: true },
    });
  }

  async findOne(id: number | string): Promise<TattooMachine> {
    return this.tattooMachinesModel.findOne({
      where: { id },
    });
  }

  async findOneByName(name: string): Promise<TattooMachine> {
    return this.tattooMachinesModel.findOne({
      where: { name },
    });
  }

  async searchByString(
    str: string,
  ): Promise<{ count: number; rows: TattooMachine[] }> {
    return this.tattooMachinesModel.findAndCountAll({
      limit: 20,
      where: { name: { [Op.like]: `%${str}%` } },
    });
  }
}
