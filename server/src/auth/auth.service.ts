import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from '../user/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.interface';
import { TokenPayload } from './types';
import { EmailService } from '../email/email.service';
import { HOST } from '../config/constants';
import {
  differenceInSeconds,
  getTime,
  addDays,
  addMinutes,
  differenceInMilliseconds,
} from 'date-fns';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
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
    }
    return null;
  }

  generateToken(payload: TokenPayload, expiresIn: string) {
    return this.jwtService.signAsync(payload, {
      expiresIn,
    });
  }

  async renewToken(userID: string) {
    const user = await this.userService.loadUser(userID);
    const token = await this.generateToken(
      { email: user.email, sub: user.id },
      '1min',
    );
    return token;
  }

  async loadUser(userId) {
    const user = await this.userService.loadUser(userId);
    return user;
  }

  async sendMail(email: string) {
    try {
      const user = await this.userService.findOne(email);

      if (user) {
        const token = await this.generateToken({ email }, '1h');
        const resetLink = `${HOST}/auth/reset?token=${token}`;
        await this.emailService.sendResetPasswordEmail(email, resetLink);
        return { success: true, message: null, status: HttpStatus.CREATED };
      }
      return {
        success: false,
        message: 'user does not exist',
        status: HttpStatus.BAD_REQUEST,
      };
    } catch (error) {
      return {
        success: false,
        message: 'email was not sent',
        status: HttpStatus.SERVICE_UNAVAILABLE,
      };
    }
  }

  calculateExpiryTime(minutes: number) {
    const now = new Date();
    const inGivenMinutes = addMinutes(now, 2);

    const MaxAge = differenceInMilliseconds(inGivenMinutes, now);
    return MaxAge;
  }

  async validateToken(token): Promise<[boolean, any]> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);

      return [true, decoded];
    } catch (error) {
      return [false, null];
    }
  }
}
