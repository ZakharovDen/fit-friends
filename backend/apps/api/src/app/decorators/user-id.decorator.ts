import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.headers['X-User-Id'];

    if (!userId) {
      throw new HttpException(
        'X-User-Id header is missing',
        HttpStatus.BAD_REQUEST,
      );
    }

    return userId;
  },
);