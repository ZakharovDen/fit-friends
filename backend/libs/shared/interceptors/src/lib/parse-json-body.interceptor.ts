import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ParseJsonBodyInterceptor implements NestInterceptor {
  constructor(private jsonBodyKey?: string) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const key = this.jsonBodyKey || 'jsonData'

    if (request.headers['content-type'] && request.headers['content-type'].startsWith('multipart/form-data')) {
      if (request.body && request.body[key]) {
        try {
          request.body = {
            ...request.body,
            ...JSON.parse(request.body[key]),
          };
          delete request.body[key];
        } catch { 
          throw new BadRequestException(`Invalid JSON format for ${key}`);
        }
      }
    }

    return next.handle();
  }
}