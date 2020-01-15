import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() data: CreateUserDto) {
    console.log({ data });
    return this.authService.register(data);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  getUser(@Request() req) {
    return this.authService.loadUser(req.user.userId);
  }
}
