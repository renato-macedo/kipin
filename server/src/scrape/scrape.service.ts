import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ScrapeService {
  async getImagePreview(URL: string) {
    const response = await axios.get(URL);
    const $ = cheerio.load(response.data);

    const previewURL = this.searchAttribute($, 'image');
    const previewDescription = this.searchAttribute($, 'description');
    const previewTitle = this.searchAttribute($, 'title');

    return { previewTitle, previewDescription, previewURL };
  }

  searchAttribute($: CheerioStatic, attribute: string) {
    return $(`meta[property='og:${attribute}']`).attr('content');
  }
  // searchImageURL(html: string) {
  //   const ogIndex = html.indexOf('og:image');
  //   console.log('ogIndex', ogIndex);
  //   const contentIndex = html.indexOf('content', ogIndex);

  //   const first = html.indexOf(`'`, contentIndex);

  //   const last = html.indexOf(`'`, first + 1);

  //   const URL = html.substring(first + 1, last);
  //   console.log({ URL });
  // }

  // async downloadImage(imageURL: string) {
  //   const { data } = await axios.get(imageURL);
  //   console.log(data);
  // }
}
