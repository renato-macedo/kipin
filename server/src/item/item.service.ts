import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './item.interface';
import { ScrapeService } from '../scrape/scrape.service';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel('Item') private readonly itemModel: Model<Item>,
    private readonly scrapeService: ScrapeService,
  ) {}

  async index(userid) {
    console.log({ userid });
    const items = await this.itemModel
      .find({ user: userid })
      .sort('-createdAt')
      .exec();

    return items.map(item => ({
      id: item.id,
      body: item.body,
      title: item.title,
      image: item.previewURL,
      description: item.previewDescription,
    }));
  }

  async createItem(data: any) {
    const { userId: user, body, title } = data;
    console.log(user);
    let item = await this.itemModel.findOne({ body });
    if (!item) {
      const previewData = await this.scrapeService.getImagePreview(body);

      item = await new this.itemModel({
        user,
        body,
        title,
        ...previewData,
      }).save();
    }

    return {
      id: item.id,
      body: item.body,
      title: item.previewTitle,
      image: item.previewURL,
      description: item.previewDescription,
    };
  }

  async updateItem(data: any) {
    const { id, title, body, userId: user } = data;

    try {
      const tobeUpdated = await this.itemModel.findOne({ _id: id, user });
      console.log(tobeUpdated);
      if (!tobeUpdated) {
        console.log(tobeUpdated);
      }
      const updatedItem = await tobeUpdated
        .updateOne({
          title,
          body,
        })
        .exec();

      return { message: 'Item updated' };
    } catch (error) {
      return null;
    }
  }

  async deleteItem(itemid: string, userid: string) {
    try {
      const toBeDeleted = await this.itemModel
        .findOne({
          _id: itemid,
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
