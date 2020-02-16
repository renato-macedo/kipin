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
    return user.depopulate('password');
  }

  async create({ name, email, password }) {
    const user = await this.userModel.findOne({ email });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

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

  findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  loadUser(userId: string) {
    return this.userModel
      .findById(userId)
      .select('-password')
      .exec();
  }

  async updatePassword(email: string, newPassword: string) {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        // throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
        return false;
      }

      const hash = await bcrypt.hash(newPassword, 10);

      await user.updateOne({ password: hash }).exec();
    } catch (error) {
      return false;
    }
  }
}
