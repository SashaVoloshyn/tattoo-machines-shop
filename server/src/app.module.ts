import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from './config/sequelize.config.service';
import { databaseConfig } from './config/main.config';
import { AuthModule } from './auth/auth.module';
import { TattooMachineModule } from './tattoo-machine/tattoo-machine.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    UsersModule,
    AuthModule,
    TattooMachineModule,
    ShoppingCartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
