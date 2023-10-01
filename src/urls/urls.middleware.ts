import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class UrlsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('just checking the headers', req.headers);
    next();
  }
}
