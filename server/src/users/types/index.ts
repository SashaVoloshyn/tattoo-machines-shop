import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty({ example: 'Alisa' })
  username: string;

  @ApiProperty({ example: '123456789Aa' })
  password: string;
}

export class LoginUserResponse {
  @ApiProperty({
    example: {
      user: {
        userId: 1,
        username: 'Alisa',
        email: 'alisa@gmail.com',
      },
    },
  })
  user: {
    userId: number;
    username: string;
    email: string;
  };

  @ApiProperty({ example: 'Logged in' })
  msg: string;
}

export class LogoutUserResponse {
  @ApiProperty({ example: 'session has ended' })
  msg: string;
}

export class LoginCheckResponse {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 'Alisa' })
  username: string;

  @ApiProperty({ example: 'Alisa@gmail.com' })
  email: string;
}

export class SignUpResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Alisa' })
  username: string;

  @ApiProperty({ example: 'Alisa@gmail.com' })
  email: string;

  @ApiProperty({ example: 'wrfefduji2323in1@#(&njljfw#&@32jk4' })
  password: string;

  @ApiProperty({ example: '2023-05-17T17:23:23.502Z' })
  updatedAt: string;

  @ApiProperty({ example: '2023-05-17T17:23:23.502Z' })
  createdAt: string;
}
