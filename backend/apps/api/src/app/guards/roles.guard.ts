import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppService } from '../app.service';
import { UserRole } from '@backend/core';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private appService: AppService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return await this.appService.matchRoles(roles, user.role);
  }
}