import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { SequelizeConfigService } from 'src/config/sequelize.config.service';
import { databaseConfig } from 'src/config/main.config';
import { User } from 'src/users/users.model';
import * as session from 'express-session';
import * as passport from 'passport';
import { AuthModule } from 'src/auth/auth.module';
import { TattooMachineModule } from 'src/tattoo-machine/tattoo-machine.module';
import { TattooMachineService } from 'src/tattoo-machine/tattoo-machine.service';
import { UsersService } from 'src/users/users.service';
import { ShoppingCart } from 'src/shopping-cart/shopping-cart.model';
import { ShoppingCartModule } from 'src/shopping-cart/shopping-cart.module';
import { UsersModule } from 'src/users/users.module';

const mockedUser = {
  username: 'Mockedman',
  password: '123654777789mM',
  email: 'mockedman@gmail.com',
};

describe('Shopping cart controller', () => {
  let app: INestApplication;
  let tattooMachineService: TattooMachineService;
  let usersService: UsersService;

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

    app = testModule.createNestApplication();
    app.use(
      session({
        secret: process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: false,
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

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

  it('should get all cart items', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const response = await request(app.getHttpServer())
      .get(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
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
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('should get all cart items', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    await request(app.getHttpServer())
      .post(`/shopping-cart/add`)
      .send({ username: mockedUser.username, machineId: 3 })
      .set('Cookie', login.headers['set-cookie']);

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const response = await request(app.getHttpServer())
      .get(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.find((item) => item.machineId === 3)).toEqual(
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
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });

  it('should get updated count of cart item', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .patch(`/shopping-cart/count/3`)
      .send({ count: 1 })
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual({ count: 1 });
  });

  it('should get updated total price of cart item', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const machine = await tattooMachineService.findOne(3);

    const response = await request(app.getHttpServer())
      .patch(`/shopping-cart/total-price/3`)
      .send({ total_price: machine.price * 5 })
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual({ total_price: machine.price * 5 });
  });

  it('should delete one item', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    await request(app.getHttpServer())
      .delete(`/shopping-cart/one/3`)
      .set('Cookie', login.headers['set-cookie']);

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const response = await request(app.getHttpServer())
      .get(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.find((item) => item.machineId === 3)).toBeUndefined();
  });

  it('should delete all item', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    await request(app.getHttpServer())
      .delete(`/shopping-cart/all/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    const response = await request(app.getHttpServer())
      .get(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toStrictEqual([]); // строго рівно пустому массиву
  });
});
