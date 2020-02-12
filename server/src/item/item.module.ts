import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from './item.schema';
import { ScrapeModule } from '../scrape/scrape.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]),
    ScrapeModule,
  ],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
