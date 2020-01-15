import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from '../user/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findOne(email);

    if (user) {
      const { password } = user;
      const isSamePassword = await bcrypt.compare(pass, password);
      if (isSamePassword) {
        return this.userService.sanitizeUser(user);
      }
      return null;
      // throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return null;
  }

  login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  register(user: CreateUserDto) {
    return this.userService.create(user);
  }

  async loadUser(userId) {
    const user = await this.userService.loadUser(userId);
    return user;
  }
}
