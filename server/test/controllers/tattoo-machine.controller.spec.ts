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

const mockedUser = {
  username: 'Mockedman',
  password: '123654777789mM',
  email: 'mockedman@gmail.com',
};

describe('Tattoo machines controller', () => {
  let app: INestApplication;

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
        AuthModule,
        TattooMachineModule,
      ],
    }).compile();

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

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
  });

  it('should get one machine', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .get('/tattoo-machines/find/3')
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: 3,
        price: expect.any(Number),
        machine_manufacturer: expect.any(String),
        country_manufacturer: expect.any(String),
        vendor_code: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        color: expect.any(String),
        images: expect.any(String),
        weight: expect.any(Number),
        material: expect.any(String),
        in_stock: expect.any(Number),
        needle_stroke: expect.any(Number),
        bestseller: expect.any(Boolean),
        new: expect.any(Boolean),
        type: expect.any(String),
        popularity: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });

  it('should get bestsellers', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .get('/tattoo-machines/bestsellers')
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          price: expect.any(Number),
          machine_manufacturer: expect.any(String),
          country_manufacturer: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          color: expect.any(String),
          images: expect.any(String),
          weight: expect.any(Number),
          material: expect.any(String),
          in_stock: expect.any(Number),
          needle_stroke: expect.any(Number),
          bestseller: true,
          new: expect.any(Boolean),
          type: expect.any(String),
          popularity: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('should get new', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .get('/tattoo-machines/new')
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          price: expect.any(Number),
          machine_manufacturer: expect.any(String),
          country_manufacturer: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          color: expect.any(String),
          images: expect.any(String),
          weight: expect.any(Number),
          material: expect.any(String),
          in_stock: expect.any(Number),
          needle_stroke: expect.any(Number),
          bestseller: expect.any(Boolean),
          new: true,
          type: expect.any(String),
          popularity: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('should search by str', async () => {
    const body = { search: 'que' };
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .post('/tattoo-machines/search')
      .send(body)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.rows.length).toBeLessThanOrEqual(20);

    response.body.rows.forEach((element) => {
      expect(element.name.toLowerCase()).toContain(body.search);
    });
    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          price: expect.any(Number),
          machine_manufacturer: expect.any(String),
          country_manufacturer: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          color: expect.any(String),
          images: expect.any(String),
          weight: expect.any(Number),
          material: expect.any(String),
          in_stock: expect.any(Number),
          needle_stroke: expect.any(Number),
          bestseller: expect.any(Boolean),
          new: expect.any(Boolean),
          type: expect.any(String),
          popularity: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('should get by name', async () => {
    const body = { name: 'Modi temporibus quod.' };
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const response = await request(app.getHttpServer())
      .post('/tattoo-machines/name')
      .send(body)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        price: expect.any(Number),
        machine_manufacturer: expect.any(String),
        country_manufacturer: expect.any(String),
        vendor_code: expect.any(String),
        name: 'Modi temporibus quod.',
        description: expect.any(String),
        color: expect.any(String),
        images: expect.any(String),
        weight: expect.any(Number),
        material: expect.any(String),
        in_stock: expect.any(Number),
        needle_stroke: expect.any(Number),
        bestseller: expect.any(Boolean),
        new: expect.any(Boolean),
        type: expect.any(String),
        popularity: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });
});
