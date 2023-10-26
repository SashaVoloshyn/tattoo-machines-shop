import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingCart } from './shopping-cart.model';
import { UsersService } from '../users/users.service';
import { TattooMachineService } from '../tattoo-machine/tattoo-machine.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart)
    private shoppingCartModel: typeof ShoppingCart,
    private readonly usersService: UsersService,
    private readonly tattooMachineService: TattooMachineService,
  ) {}

  async findAll(userId: number | string): Promise<ShoppingCart[]> {
    return this.shoppingCartModel.findAll({ where: { userId } });
  }

  async add(addToCartDto: AddToCartDto) {
    const cart = new ShoppingCart();
    const user = await this.usersService.findOne({
      where: { username: addToCartDto.username },
    });
    const machine = await this.tattooMachineService.findOne(
      addToCartDto.machineId,
    );

    cart.userId = user.id;
    cart.machineId = machine.id;
    cart.machine_manufacturer = machine.machine_manufacturer;
    cart.country_manufacturer = machine.country_manufacturer;
    cart.price = machine.price;
    cart.in_stock = machine.in_stock;
    cart.image = JSON.parse(machine.images)[0];
    cart.name = machine.name;
    cart.total_price = machine.price;

    return cart.save();
  }

  async updateCount(
    count: number,
    machineId: number | string,
  ): Promise<{ count: number }> {
    await this.shoppingCartModel.update({ count }, { where: { machineId } });

    const machine = await this.shoppingCartModel.findOne({
      where: { machineId },
    });
    return { count: machine.count };
  }

  async updateTotalPrice(
    total_price: number,
    machineId: number | string,
  ): Promise<{ total_price: number }> {
    await this.shoppingCartModel.update(
      { total_price },
      { where: { machineId } },
    );

    const machine = await this.shoppingCartModel.findOne({
      where: { machineId },
    });
    return { total_price: machine.total_price };
  }

  async remove(machineId: number | string): Promise<void> {
    const machine = await this.shoppingCartModel.findOne({
      where: { machineId },
    });

    await machine.destroy();
  }

  async removeAll(userId: number | string): Promise<void> {
    await this.shoppingCartModel.destroy({ where: { userId } });
  }
}
