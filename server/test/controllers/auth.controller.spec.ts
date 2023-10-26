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

const mockedUser = {
  username: 'Mockedman',
  password: '123654777789mM',
  email: 'mockedman@gmail.com',
};

describe('Auth controller', () => {
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
    await User.destroy({ where: { username: 'testUser' } });
  });

  it('should login user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    expect(response.body.user.username).toBe(mockedUser.username);
    expect(response.body.msg).toBe('Logged in');
    expect(response.body.user.email).toBe(mockedUser.email);
  });

  it('should login check', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const loginCheck = await request(app.getHttpServer())
      .get('/users/login-check')
      .set('Cookie', login.headers['set-cookie']);

    expect(loginCheck.body.username).toBe(mockedUser.username);
    expect(loginCheck.body.email).toBe(mockedUser.email);
  });

  it('should logout', async () => {
    const response = await request(app.getHttpServer()).get('/users/logout');

    expect(response.body.msg).toBe('session has ended');
  });
});
