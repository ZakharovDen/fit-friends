import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class InjectUserIdInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.user) {
      request.body['userId'] = request.user.id;
      request.headers['X-User-Id'] = request.user.id;
    }

    return next.handle();
  }
}