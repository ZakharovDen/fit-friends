import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';

@Injectable()
export class InjectUserIdInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if (request.user) {
      request.body['userId'] = request.user.sub;
      request.headers['X-User-Id'] = request.user.sub;
    }

    return next.handle();
  }
}