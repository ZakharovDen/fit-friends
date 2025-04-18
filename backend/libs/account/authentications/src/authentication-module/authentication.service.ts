import { ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity, UserRepository } from '@backend/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Token, User } from '@backend/core';
import { jwtConfig } from '@backend/account-config';
import { ConfigType } from '@nestjs/config';
import { createJWTPayload } from '@backend/helpers';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateQuestionnaireDto } from '../dto/create-user-questionnaire.dto';
import { UpdateQuestionnaireDto } from '../dto/update-user-questionnaire.dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) { }

  public async register(dto: CreateUserDto): Promise<UserEntity> {

    const user = {
      ...dto, passwordHash: '',
    };

    const existUser = await this.userRepository
      .findByEmail(dto.email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new UserEntity(user)
      .setPassword(dto.password)

    await this.userRepository
      .save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return user;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: randomUUID() };
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

  public async getUserByEmail(email: string): Promise<UserEntity> {
    const existUser = await this.userRepository.findByEmail(email);

    if (! existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  public async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.getUser(id);
    const updatedUser = Object.assign(user, dto);
    await this.userRepository.update(updatedUser);
    return user;
  }

  public async addQuestionnaire(userId: string, dto: CreateQuestionnaireDto): Promise<UserEntity> {
    const user = await this.getUser(userId);
    user.questionnaire = dto;
    await this.userRepository.update(user);
    return user;
  }

  public async updateQuestionnaire(userId: string, dto: UpdateQuestionnaireDto): Promise<UserEntity> {
    const user = await this.getUser(userId);
    user.questionnaire = Object.assign(user.questionnaire, dto);
    await this.userRepository.update(user);
    return user;
  }
}
