import { Module } from '@nestjs/common';
import { TattooMachineController } from './tattoo-machine.controller';
import { TattooMachineService } from './tattoo-machine.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TattooMachine } from './tattoo-machine.model';

@Module({
  imports: [SequelizeModule.forFeature([TattooMachine])],
  controllers: [TattooMachineController],
  providers: [TattooMachineService],
  exports: [TattooMachineService],
})
export class TattooMachineModule {}
