import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  sanitizeUser(user: User) {
    console.log('depopulate', user.depopulate('password'));
    return user.depopulate('password');
  }

  async create(data: CreateUserDto) {
    const { name, password, email } = data;
    const user = await this.userModel.findOne({ email });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    console.log(data);
    const hash = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      name,
      password: hash,
      email,
    });

    await newUser.save();
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  }

  // private async findByEmail(email: string) {
  //   const user = await this.userModel.find({ email });
  //   if (!user) {
  //     return null;
  //   }

  // }

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }
}
