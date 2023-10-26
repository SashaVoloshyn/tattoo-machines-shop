import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  findOne(filter: {
    where: { id?: string; username?: string; email?: string };
  }): Promise<User> {
    return this.userModel.findOne({ ...filter });
  }

  async createOne(
    createUserDto: CreateUserDto,
  ): Promise<User | { warningMessage: string }> {
    const user = new User();
    const existByEmail = await this.findOne({
      where: { email: createUserDto.email },
    });
    const existByUserName = await this.findOne({
      where: { username: createUserDto.username },
    });

    if (existByEmail) {
      return { warningMessage: 'Користувач з такою почтою вже існує' };
    }
    if (existByUserName) {
      return { warningMessage: "Користувач з таким і'мям вже існує" };
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      Number(process.env.HASH_SALT),
    );

    user.username = createUserDto.username;
    user.password = hashedPassword;
    user.email = createUserDto.email;

    return user.save();
  }
}
