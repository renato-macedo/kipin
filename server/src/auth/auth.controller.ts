import {
  Controller,
  Post,
  UseGuards,
  Res,
  Body,
  Get,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.dto';

import { differenceInSeconds, format, getTime, addDays, addMinutes } from 'date-fns'
import { Response, Request } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req, @Res() res: Response) {
    console.log(req.user);
    const [token, refresh_token] = await Promise.all([
      this.authService.generateAccessToken(req.user),
      this.authService.generateRefreshToken(req.user.id)
    ])
    const now = new Date()
    const inFifteenMinutes = addMinutes(now, 2)
    const inSevenDays = addDays(now, 7)

    const expiresIn = getTime(inFifteenMinutes) //differenceInSeconds(inFifteenMinutes, now)
    const MaxAge = differenceInSeconds(inSevenDays, now)

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: 120000,
    })
    //res.cookie('refresh_token', refresh_token, { maxAge: 180, httpOnly: true })
    // res.header('Set-Cookie', `refresh_token=${refresh_token}; Max-Age=${3 * 60}; HttpOnly`);
    return res.json({ token, expiresIn });
  }

  @Post('register')
  register(@Body() data: CreateUserDto) {
    console.log({ data });
    return this.authService.register(data);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  getUser(@Req() req) {
    return this.authService.loadUser(req.user.userId);
  }

  @Get('refresh_token')
  refresh(@Req() req: Request) {
    if (req.cookies.refresh_token) {
      console.log('cookie', req.cookies)
      console.log(JSON.stringify(req.cookies, null, 2));


      return { token: req.cookies.refresh_token };
    }

    throw new BadRequestException('No cookie')

  }
}
