import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { Url } from './schemas/urls.schema';
import { CreateUrlDto } from './dto/createUrl.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('url')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized Bearer Token Auth' })
@Controller('urls')
@UseGuards(JwtAuthGuard)
export class UrlsController {
  constructor(private urlService: UrlsService) {}

  @Get()
  getAll(): Promise<Url[]> {
    return this.urlService.getAllUrls();
  }

  @Post('/encode')
  @ApiCreatedResponse({ description: 'The url has been encoded' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  encodeUrl(@Body() url: CreateUrlDto): Promise<Url> {
    return this.urlService.createUrl(url);
  }

  @Get(':short')
  @ApiBadRequestResponse({ description: 'The Url not exists.' })
  @ApiCreatedResponse({ description: 'The URL exists' })
  decodeUrl(@Param('short') short: string): Promise<Url> {
    return this.urlService.decodeUrl(short);
  }
}
