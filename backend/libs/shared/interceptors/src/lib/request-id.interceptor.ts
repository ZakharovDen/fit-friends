import * as crypto from 'crypto';
import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class RequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestId = crypto.randomUUID();

    const request = context.switchToHttp().getRequest<Request>();
    request.headers['X-Request-Id'] = requestId;

    Logger.debug(`[${request.method}: ${request.url}]: RequestID is ${requestId}`)
    return next.handle();
  }
}