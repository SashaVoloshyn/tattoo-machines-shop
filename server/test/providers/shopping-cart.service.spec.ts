import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { SequelizeConfigService } from 'src/config/sequelize.config.service';
import { databaseConfig } from 'src/config/main.config';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';
import { TattooMachineModule } from 'src/tattoo-machine/tattoo-machine.module';
import { TattooMachineService } from 'src/tattoo-machine/tattoo-machine.service';
import { UsersService } from 'src/users/users.service';
import { ShoppingCart } from 'src/shopping-cart/shopping-cart.model';
import { ShoppingCartModule } from 'src/shopping-cart/shopping-cart.module';
import { UsersModule } from 'src/users/users.module';
import { ShoppingCartService } from 'src/shopping-cart/shopping-cart.service';

const mockedUser = {
  username: 'Mockedman',
  password: '123654777789mM',
  email: 'mockedman@gmail.com',
};

describe('Shopping cart service', () => {
  let app: INestApplication;
  let tattooMachineService: TattooMachineService;
  let usersService: UsersService;
  let shoppingCartService: ShoppingCartService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        UsersModule,
        ShoppingCartModule,
        AuthModule,
        TattooMachineModule,
      ],
    }).compile();

    tattooMachineService =
      testModule.get<TattooMachineService>(TattooMachineService);
    usersService = testModule.get<UsersService>(UsersService);
    shoppingCartService =
      testModule.get<ShoppingCartService>(ShoppingCartService);

    app = testModule.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    const user = new User();

    const hashedPassword = await bcrypt.hash(
      mockedUser.password,
      Number(process.env.HASH_SALT),
    );

    user.username = mockedUser.username;
    user.password = hashedPassword;
    user.email = mockedUser.email;

    return user.save();
  });

  beforeEach(async () => {
    const cart = new ShoppingCart();
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });
    const machine = await tattooMachineService.findOne(1);

    cart.userId = user.id;
    cart.machineId = machine.id;
    cart.machine_manufacturer = machine.machine_manufacturer;
    cart.country_manufacturer = machine.country_manufacturer;
    cart.price = machine.price;
    cart.in_stock = machine.in_stock;
    cart.image = JSON.parse(machine.images)[1];
    cart.name = machine.name;
    cart.total_price = machine.price;

    return cart.save();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
    await ShoppingCart.destroy({ where: { machineId: 1 } });
  });

  it('should return all cart items', async () => {
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const machine = await shoppingCartService.findAll(user.id);

    machine.forEach((item) => {
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          userId: user.id,
          machineId: expect.any(Number),
          count: expect.any(Number),
          price: expect.any(Number),
          total_price: expect.any(Number),
          machine_manufacturer: expect.any(String),
          country_manufacturer: expect.any(String),
          name: expect.any(String),
          image: expect.any(String),
          in_stock: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });

  it('should add cart items', async () => {
    await shoppingCartService.add({
      username: mockedUser.username,
      machineId: 3,
    });
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const machine = await shoppingCartService.findAll(user.id);

    expect(machine.find((item) => item.machineId === 3)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: user.id,
        machineId: 3,
        count: expect.any(Number),
        price: expect.any(Number),
        total_price: expect.any(Number),
        machine_manufacturer: expect.any(String),
        country_manufacturer: expect.any(String),
        name: expect.any(String),
        image: expect.any(String),
        in_stock: expect.any(Number),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should update count', async () => {
    const res = await shoppingCartService.updateCount(2, 1);

    expect(res).toEqual({
      count: 2,
    });
  });

  it('should update total price', async () => {
    const machine = await tattooMachineService.findOne(1);
    const res = await shoppingCartService.updateTotalPrice(
      machine.price * 5,
      1,
    );

    expect(res).toEqual({
      total_price: machine.price * 5,
    });
  });

  it('should  delete one cart item', async () => {
    await shoppingCartService.remove(1);

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const machine = await shoppingCartService.findAll(user.id);

    expect(machine.find((item) => item.machineId === 1)).toBeUndefined();
  });

  it('should  delete all cart items', async () => {
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    await shoppingCartService.removeAll(user.id);

    const cart = await shoppingCartService.findAll(user.id);

    expect(cart).toStrictEqual([]);
  });
});
