import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from './page.interface';
import { CreatePageDto, UpdatePageDto } from './page.dto';

@Injectable()
export class PageService {
  constructor(@InjectModel('Page') private readonly pageModel: Model<Page>) {}

  async index(userid) {
    console.log({ userid });
    const pages = await this.pageModel.find({ user: userid }).exec();
    
    return pages.map(page => ({ id: page.id, caption: page.caption, url: page.url, title: page.title }));
  }

  async createPage(data: any) {
    const { userId: user, caption, url, title } = data;
    console.log(user);
    const newPage = await new this.pageModel({ user, caption, url, title }).save();

    return newPage;
  }

  async updatePage(data: any) {
    const { url, id, caption, userId: user } = data;

    try {
      const tobeUpdated = await this.pageModel.findOne({ _id: id, user });
      console.log(tobeUpdated);
      if (!tobeUpdated) {
        console.log(tobeUpdated);
      }
      const updatedPage = await tobeUpdated
        .updateOne({
          url,
          caption,
        })
        .exec();

      return { message: 'Item updated' };
    } catch (error) {
      return null;
    }
  }

  async deletePage(pageid: string, userid: string) {
    try {
      const toBeDeleted = await this.pageModel
        .findOne({
          _id: pageid,
          user: userid,
        })
        .exec();

      if (!toBeDeleted) {
        return null;
      }

      await toBeDeleted.remove();
      return true;
    } catch (error) {
      return null;
    }
  }
}
