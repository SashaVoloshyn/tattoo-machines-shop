import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from 'src/config/sequelize.config.service';
import { databaseConfig } from 'src/config/main.config';
import { TattooMachineService } from 'src/tattoo-machine/tattoo-machine.service';
import { TattooMachineModule } from 'src/tattoo-machine/tattoo-machine.module';

describe('tattoo machine service', () => {
  let app: INestApplication;
  let tattooMachineService: TattooMachineService;

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
        TattooMachineModule,
      ],
    }).compile();

    tattooMachineService =
      testModule.get<TattooMachineService>(TattooMachineService);
    app = testModule.createNestApplication();
    await app.init();
  });

  it('should find id', async () => {
    const machine = await tattooMachineService.findOne(1);

    expect(machine.dataValues).toEqual(
      expect.objectContaining({
        id: 1,
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
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should find name', async () => {
    const machine = await tattooMachineService.findOneByName(
      'Modi temporibus quod.',
    );

    expect(machine.dataValues).toEqual(
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
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should find by search str', async () => {
    const machines = await tattooMachineService.searchByString('quo');

    expect(machines.rows.length).toBeLessThanOrEqual(20);

    machines.rows.forEach((item) => {
      expect(item.name.toLowerCase()).toContain('quo');

      expect(item.dataValues).toEqual(
        expect.objectContaining({
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
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });

  it('should find by bestsellers', async () => {
    const machines = await tattooMachineService.bestsellers();

    machines.rows.forEach((item) => {
      expect(item.dataValues).toEqual(
        expect.objectContaining({
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
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });

  it('should find by new', async () => {
    const machines = await tattooMachineService.new();

    machines.rows.forEach((item) => {
      expect(item.dataValues).toEqual(
        expect.objectContaining({
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
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });
});
