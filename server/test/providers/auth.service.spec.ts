import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { SequelizeConfigService } from 'src/config/sequelize.config.service';
import { databaseConfig } from 'src/config/main.config';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

const mockedUser = {
  username: 'Mockedman',
  password: '123654777789mM',
  email: 'mockedman@gmail.com',
};

describe('Auth service', () => {
  let app: INestApplication;
  let authService: AuthService;

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

    authService = testModule.get<AuthService>(AuthService);
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

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
    await User.destroy({ where: { username: 'testUser' } });
  });

  it('should validate user', async () => {
    const user = await authService.validateUser(
      mockedUser.username,
      mockedUser.password,
    );

    expect(user.username).toBe(mockedUser.username);
    expect(user.email).toBe(mockedUser.email);
  });
});
