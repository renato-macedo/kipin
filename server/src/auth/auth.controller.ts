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
  Render,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.dto';

import { Response, Request } from 'express';
import { UserService } from '../user/user.service';
import { ResetDto, RefreshTokenDTO } from './types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req, @Res() res: Response) {
    const { email, id } = req.user;
    const [token, refresh_token] = await Promise.all([
      this.authService.generateToken({ email, sub: id }, '1min'),
      this.authService.generateToken({ email, sub: id }, '10min'),
    ]);

    const MaxAge = this.authService.calculateExpiryTime(10);
    return res
      .cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: MaxAge,
      })
      .cookie('userID', id, {
        httpOnly: true,
        maxAge: MaxAge,
      })
      .json({ token, email, refresh_token });

    // return res.json({ token, expiresIn });
  }
  @UseGuards(AuthGuard('local'))
  @Post('login/mobile')
  async loginMobile(@Req() req, @Res() res: Response) {
    const { email, id } = req.user;
    const [token, refresh_token] = await Promise.all([
      this.authService.generateToken({ email, sub: id }, '1min'),
      this.authService.generateToken({ email, sub: id }, '10min'),
    ]);

    //const MaxAge = this.authService.calculateExpiryTime(10);

    return res.json({ token, refresh_token });
  }

  @Post('register')
  async register(@Body() data: CreateUserDto, @Res() res) {
    //return this.authService.register(data);
    const { name, password, email } = data;
    const user = await this.userService.create({ name, password, email });

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
    const MaxAge = this.authService.calculateExpiryTime(10);

    return res
      .cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: MaxAge,
      })
      .json({ token });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  getUser(@Req() req) {
    return this.authService.loadUser(req.user.userId);
  }

  @Get('refresh_token')
  async refresh(@Req() req: Request) {
    if (req.cookies.refresh_token) {
      const token = await this.authService.renewToken(req.cookies.userID);
      //this.authService.generateToken()
      return { token };
    }

    throw new BadRequestException('No cookie');
  }

  @Post('refresh_token/mobile') // TODO: change this path
  async refreshMobile(@Body() body) {
    //console.log('refresh token mobile', { body });
    if (body.refresh_token) {
      const [valid, decoded] = await this.authService.validateToken(
        body.refresh_token,
      );
      console.log(decoded);
      if (valid) {
        const newToken = await this.authService.renewToken(decoded.sub);
        console.log('response', newToken);
        return { token: newToken };
      }
      throw new BadRequestException('invalid token');
    }

    throw new BadRequestException('missing refresh token');
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    if (req.cookies.refresh_token) {
      return res
        .clearCookie('refresh_token')
        .clearCookie('userID')
        .json({ message: 'Log Out successfully' });
    }
    throw new BadRequestException('No cookie');
  }

  @Post('token')
  async validateToken(@Body() body) {
    const { token } = body;
    if (token) {
      const [valid, decoded] = await this.authService.validateToken(body.token);
      if (valid) {
        return { email: decoded.email };
      }
    }

    throw new BadRequestException('invalid token');
  }
  // @Get('reset')
  // renderResetView(@Query('token') token, @Res() res: Response) {
  //   if (token) {
  //     const [valid, decoded] = this.authService.validateToken(token);

  //     if (valid) {
  //       return res.render('reset_password', {
  //         validToken: true,
  //         email: decoded.email,
  //       });
  //     }
  //   }

  //   return res.render('reset_password', {
  //     validToken: false,
  //   });
  // }

  @Post('/reset')
  newPassword(@Body() body) {
    const { password, email, confirm_password } = body;
    if (email && password && confirm_password) {
      if (password === confirm_password) {
        const success = this.userService.updatePassword(email, password);
        if (success) {
          return { success: true, message: 'password updated' };
        }
      }
    }

    throw new BadRequestException('password could not be updated');
  }

  @Post('sendmail')
  async sendEmail(@Body() data: ResetDto) {
    const { email } = data;
    const { success, message, status } = await this.authService.sendMail(email);
    if (success) {
      return { message: `email sent to ${email}` };
    }

    throw new HttpException(message, status);
  }
}
