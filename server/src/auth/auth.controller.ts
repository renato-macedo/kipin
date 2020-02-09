import {
  Controller,
  Post,
  UseGuards,
  Res,
  Body,
  Get,
  Req,
  BadRequestException,
  Query,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.dto';

import { differenceInSeconds, getTime, addDays, addMinutes } from 'date-fns';
import { Response, Request } from 'express';
import { UserService } from '../user/user.service';
import { ResetDto } from './types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req, @Res() res: Response) {
    //console.log(req.user);
    const { email, id } = req.user;
    const [token, refresh_token] = await Promise.all([
      this.authService.generateToken({ email, sub: id }, '1min'),
      this.authService.generateToken({ sub: id }, '1h'),
    ]);
    const now = new Date();
    const inFifteenMinutes = addMinutes(now, 2);
    const inSevenDays = addDays(now, 7);

    const expiresIn = getTime(inFifteenMinutes); //differenceInSeconds(inFifteenMinutes, now)
    const MaxAge = differenceInSeconds(inSevenDays, now);

    return res
      .cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: 120000,
      })
      .json({ token, expiresIn });

    // return res.json({ token, expiresIn });
  }

  @Post('register')
  async register(@Body() data: CreateUserDto, @Res() res) {
    //console.log({ data });
    //return this.authService.register(data);
    const { name, password, email } = data;
    const user = await this.userService.create({ name, password, email });
    //console.log('iuiuiuiu');
    const [token, refresh_token] = await Promise.all([
      this.authService.generateToken(
        {
          email: user.email,
          sub: user.id,
        },
        '1min',
      ),
      this.authService.generateToken({ sub: user.id }, '1h'),
    ]);

    const now = new Date();
    const inFifteenMinutes = addMinutes(now, 2);
    const inSevenDays = addDays(now, 7);

    const expiresIn = getTime(inFifteenMinutes);

    return res
      .cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: 120000,
      })
      .json({ token, expiresIn });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  getUser(@Req() req) {
    return this.authService.loadUser(req.user.userId);
  }

  @Get('refresh_token')
  refresh(@Req() req: Request) {
    if (req.cookies.refresh_token) {
      //console.log('cookie', req.cookies);
      //console.log(JSON.stringify(req.cookies, null, 2));

      return { token: req.cookies.refresh_token };
    }

    throw new BadRequestException('No cookie');
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    if (req.cookies.refresh_token) {
      return res
        .clearCookie('refresh_token')
        .json({ message: 'Log Out successfully' });
    }
    throw new BadRequestException('No cookie');
  }

  @Get('reset')
  renderResetView(@Query('token') token) {
    // TODO: render view
    this.authService.validateToken(token);
  }

  @Post('reset')
  newPassword(@Body() body) {
    const { new_password, email } = body;
    const success = this.userService.updatePassword(email, new_password);
    if (success) {
      return { message: 'password updated' };
    }

    throw new BadRequestException('password could not be updated');
  }
  @Post('sendmail')
  async sendEmail(@Body() data: ResetDto) {
    const { email } = data;
    const success = await this.authService.sendMail(email);
    if (success) {
      return { message: `email sento to ${email}` };
    }

    throw new HttpException('email was not sent', 500);
  }
}
