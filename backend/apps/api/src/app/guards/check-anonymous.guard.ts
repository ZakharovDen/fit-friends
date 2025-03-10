import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CheckAnonymousGuard implements CanActivate {

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.headers['authorization']) {
      throw new HttpException('Регистрация доступна только анонимным клиентам', HttpStatus.BAD_REQUEST);
    }
    return true;
  }
}