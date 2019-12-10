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
import { ItemService } from './item.service';
import { UpdateItemDto, ItemParams, CreateItemDto } from './item.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getItems(@Request() req) {
    return this.itemService.index(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createItem(@Request() req, @Body() data: CreateItemDto) {
    console.log({ use: req.user });
    return this.itemService.createItem({ ...data, ...req.user });
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':itemid')
  async updateItem(
    @Request() req,
    @Param() params: ItemParams,
    @Body() data: UpdateItemDto,
  ) {
    const updatedItem = await this.itemService.updateItem({
      id: params.itemid,
      title: data.title,
      body: data.body,
      ...req.user,
    });

    if (!updatedItem) {
      return new NotFoundException('Item not found');
    }

    return updatedItem;
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':itemid')
  async deleteItem(@Request() req, @Param() params: ItemParams) {
    const deleted = await this.itemService.deleteItem(
      params.itemid,
      req.user.userId,
    );
    if (!deleted) {
      return new NotFoundException('Item not found');
    }
    return { message: 'Item deleted' };
  }
}
