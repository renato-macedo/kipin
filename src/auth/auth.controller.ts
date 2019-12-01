import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    console.log('asasassa', req.user);
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() data: CreateUserDto) {
    console.log({ data });
    return this.authService.register(data);
  }
}
