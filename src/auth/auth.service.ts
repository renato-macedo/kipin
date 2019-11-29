import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (user) {
      const { password } = user;
      const isSamePassword = await bcrypt.compare(pass, password);
      if (isSamePassword) {
        return this.userService.sanitizeUser(user);
      }

      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    return this.userService.create(user);
  }
}
