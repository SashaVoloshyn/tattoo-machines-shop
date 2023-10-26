import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { SequelizeConfigService } from 'src/config/sequelize.config.service';
import { databaseConfig } from 'src/config/main.config';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/users.model';

describe('Users controller', () => {
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
        UsersModule,
      ],
    }).compile();

    app = testModule.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: 'testUser' } });
  });

  it('should create user', async () => {
    const newUser = {
      username: 'testUser',
      password: '123654777789testUser',
      email: 'testuser@gmail.com',
    };

    const response = await request(app.getHttpServer())
      .post('/users/signup')
      .send(newUser);

    const passwordIsValid = await bcrypt.compare(
      newUser.password,
      response.body.password,
    );

    expect(response.body.username).toBe(newUser.username);
    expect(passwordIsValid).toBe(true);
    expect(response.body.email).toBe(newUser.email);
  });
});
