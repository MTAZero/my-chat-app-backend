

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    logger = new Logger()

    use(req: Request, res: Response, next: NextFunction) {
        this.logger.debug(`User gọi API IP: ${req.ip}, url: ${req.originalUrl}`)
        next();
    }
}
