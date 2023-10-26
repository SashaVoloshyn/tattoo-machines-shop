import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Alina' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'Alina@gmail.com' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: '123456789A' })
  @IsNotEmpty()
  readonly password: string;
}
