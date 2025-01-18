import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { host, origin, referer } = request.headers;
    const { ip, method, baseUrl: url } = request;
    const startTime = Date.now();
    
    response.on('close', () => {
      const responseTime = Date.now() - startTime;
      const { statusCode, statusMessage } = response;
      const contentLength = response.get('content-length');

      const resetColor = `\x1b[0m`;

      let reqMethodBgColor = `\x1b[44m`               // blue
      if (method === 'POST') {
        reqMethodBgColor = `\x1b[42m`                 // green
      } else if (method === 'PUT' || method === 'PATCH') {
        reqMethodBgColor = `\x1b[43m`                 // yellow
      } else if (method === 'DELETE') {
        reqMethodBgColor = `\x1b[31m`                 // red
      }

      let statusColor = `\x1b[32m`;                 // green
      if (statusCode >= 400 && statusCode < 500) {
        statusColor = `\x1b[33m`;                   // yellow
      } else if (statusCode >= 500) {
        statusColor = `\x1b[31m`;                   // red
      }

      this.logger.log(
        `${statusColor}\x1b[1m${statusCode}${resetColor} ${statusColor}${statusMessage}${resetColor} ${reqMethodBgColor}\x1b[1m${method}${resetColor} ${url} \x1b[35m${host}${resetColor} \x1b[32m${origin}${resetColor} \x1b[36m${referer}${resetColor} \x1b[31m${ip}${resetColor} ${contentLength} \x1b[32m${responseTime}ms${resetColor}`
      );
    });

    next();
  }
}