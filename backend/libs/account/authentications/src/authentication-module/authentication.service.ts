import { ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Token, User } from '@project/core';
import { NotifyService } from '@project/account-notify';
import { jwtConfig } from '@project/config';
import { ConfigType } from '@nestjs/config';
import { createJWTPayload } from '@project/helpers';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { ChangePasswordDto } from '../dto/change-password.dto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    private readonly notifyService: NotifyService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) { }

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const { email, name, password, avatar } = dto;

    const blogUser = {
      email, name, avatar, passwordHash: ''
    };

    const existUser = await this.blogUserRepository
      .findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(password)

    this.blogUserRepository
      .save(userEntity);

    await this.notifyService.registerSubscriber({ email, name });

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto): Promise<BlogUserEntity> {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return user;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });
      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUserByEmail(email: string): Promise<BlogUserEntity> {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (! existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  public async changePassword(dto: ChangePasswordDto): Promise<BlogUserEntity> {
    const user = await this.getUser(dto.userId);
    if (!await user.comparePassword(dto.currentPassword)) {
      throw new HttpException('Неверный пароль.', HttpStatus.BAD_REQUEST);
    }
    await user.setPassword(dto.newPassword);
    await this.blogUserRepository.update(user);
    return user;
  }
}
