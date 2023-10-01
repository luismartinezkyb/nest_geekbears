import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './schemas/urls.schema';
import { UrlsMiddleware } from './urls.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Url.name,
        schema: UrlSchema,
      },
    ]),
  ],
  providers: [UrlsService],
  controllers: [UrlsController],
})
export class UrlsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UrlsMiddleware).forRoutes('urls'); //this line apply the middleware to all the routes with urls, that's what we need to know the jwt token
  }
}
