import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PageSchema } from './page.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Page', schema: PageSchema }])],
  providers: [PageService],
  controllers: [PageController],
})
export class PageModule {}
