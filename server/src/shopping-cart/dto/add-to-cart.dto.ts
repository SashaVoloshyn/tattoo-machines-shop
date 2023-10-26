import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty({ example: 'Sasha' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 3 })
  @IsOptional()
  userId?: number;

  @ApiProperty({ example: 188 })
  @IsNotEmpty()
  readonly machineId: number;
}
