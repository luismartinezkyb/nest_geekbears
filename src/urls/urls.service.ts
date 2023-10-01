import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './schemas/urls.schema';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { CreateUrlDto } from './dto/createUrl.dto';

@Injectable()
export class UrlsService {
  constructor(@InjectModel(Url.name) private urlModel: Model<Url>) {}

  async getAllUrls(): Promise<Url[]> {
    const res = await this.urlModel.find();
    return res;
  }
  async createUrl(url: CreateUrlDto): Promise<Url> {
    const data = await this.urlModel.findOne({ original: url.original });
    if (data) {
      return data;
    }
    const short = await this.generateShortUrl(7);
    const res = await this.urlModel.create({ original: url.original, short });

    return res;
  }

  async generateShortUrl(length: number = 7) {
    return nanoid(length);
  }

  async decodeUrl(short: string): Promise<Url> {
    const url = await this.urlModel.findOne({ short });

    if (!url) {
      throw new NotFoundException('Url not found');
    }
    return url;
  }
}
