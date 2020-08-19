import {
  Injectable,
  UnauthorizedException,
  NestMiddleware,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function): void {
    if (req.headers.auth !== process.env.AUTH_KEY) {
      throw new UnauthorizedException();
    }
    next();
  }
}
