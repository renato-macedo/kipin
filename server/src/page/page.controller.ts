import {
  Controller,
  Get,
  Request,
  UseGuards,
  Post,
  Patch,
  Param,
  Body,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PageService } from './page.service';
import { UpdatePageDto, PageParams, CreatePageDto } from './page.dto';

@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getPages(@Request() req) {
    return this.pageService.index(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createPage(@Request() req, @Body() data: CreatePageDto) {
    console.log({ use: req.user });
    return this.pageService.createPage({ ...data, ...req.user });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':pageid')
  async updatePage(
    @Request() req,
    @Param() params: PageParams,
    @Body() data: UpdatePageDto,
  ) {
    const updatedPage = await this.pageService.updatePage({
      id: params.pageid,
      title: data.title,
      url: data.url,
      caption: data.caption,
      ...req.user,
    });

    if (!updatedPage) {
      return new NotFoundException('Item not found');
    }

    return updatedPage;
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':pageid')
  async deletePage(@Request() req, @Param() params: PageParams) {
    const deleted = await this.pageService.deletePage(
      params.pageid,
      req.user.userId,
    );
    if (!deleted) {
      return new NotFoundException('Item not found');
    }
    return { message: 'Item deleted' };
  }
}
