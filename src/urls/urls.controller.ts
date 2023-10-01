import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { Url } from './schemas/urls.schema';
import { CreateUrlDto } from './dto/createUrl.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('urls')
@UseGuards(JwtAuthGuard)
export class UrlsController {
  constructor(private urlService: UrlsService) {}

  @Get()
  getAll(): Promise<Url[]> {
    return this.urlService.getAllUrls();
  }

  @Post('/encode')
  encodeUrl(@Body() url: CreateUrlDto): Promise<Url> {
    return this.urlService.createUrl(url);
  }

  @Get(':short')
  decodeUrl(@Param('short') short: string): Promise<Url> {
    return this.urlService.decodeUrl(short);
  }
}
