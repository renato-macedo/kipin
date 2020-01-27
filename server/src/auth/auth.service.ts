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

  async validateUser(data: LoginUserDto): Promise<User> {
    const { email, password: givenPassword } = data;
    const user = await this.userService.findOne(email);

    if (user) {
      const { password } = user;
      const isSamePassword = await bcrypt.compare(givenPassword, password);
      if (isSamePassword) {
        return this.userService.sanitizeUser(user);
      }
      return null;
      // throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return null;
  }

  generateAccessToken({ userEmail, userId }) {
    const payload = { email: userEmail, sub: userId };
    return this.jwtService.signAsync(payload, {
      expiresIn: '1min',
    });
  }

  generateRefreshToken(userId) {
    return this.jwtService.signAsync(
      { sub: userId },
      {
        expiresIn: '1h',
      },
    );
  }

  async loadUser(userId) {
    const user = await this.userService.loadUser(userId);
    return user;
  }
}
