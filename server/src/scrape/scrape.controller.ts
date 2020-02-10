import { Controller, Get, Body } from '@nestjs/common';
import { ScrapeService } from './scrape.service';
import { IsUrl } from 'class-validator';

class URLDto {
  @IsUrl()
  readonly URL: string;
}

@Controller('scrape')
export class ScrapeController {
  constructor(private readonly scrapeService: ScrapeService) {}
  @Get('image')
  getLinkImage(@Body() body: URLDto) {
    const { URL } = body;
    return this.scrapeService.getImagePreview(URL);
  }
}
