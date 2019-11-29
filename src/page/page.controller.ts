import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('page')
export class PageController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getPages(@Request() req) {
    const { user } = req.user;

    return `<h1>${JSON.stringify(req.user, null, 2)}<h1>`;
  }
}
