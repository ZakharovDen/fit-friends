import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationResponseMessage } from './authentication.constant';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { UserRdo } from '../rdo/user.rdo';
import { MongoIdValidationPipe } from '@backend/pipes';
import { fillDto } from '@backend/helpers';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RequestWithUser } from './request-with-user.interface';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { RequestWithTokenPayload } from './request-with-token-payload.interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateQuestionnaireDto } from '../dto/create-user-questionnaire.dto';
import { UpdateQuestionnaireDto } from '../dto/update-user-questionnaire.dto';
import { UserQuery } from '@backend/user';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
  ) { }

  @ApiOperation({ summary: 'Регистрация пользователя.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.UserExist,
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const userToken = await this.authService.createUserToken(newUser);
    return fillDto(LoggedUserRdo, { ...newUser.toPOJO(), ...userToken });
  }

  @ApiOperation({ summary: 'Авторизация пользователя.' })
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.LoggedError,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user);
    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @ApiOperation({ summary: 'Получение детальной информации о пользователе.' })
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);
    return fillDto(UserRdo, existUser.toPOJO());
  }

  @ApiOperation({ summary: 'Список пользователей.' })
  @ApiResponse({
    type: [UserRdo],
    status: HttpStatus.OK,
  })
  @Get()
  public async showAll(
    @Query() query: UserQuery
  ) {
    const users = await this.authService.getUsers(query);
    return fillDto(UserRdo, users);
  }

  @ApiOperation({ summary: 'Получение новой пары токенов.' })
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    const existUser = await this.authService.getUser(payload.sub);
    return fillDto(UserRdo, existUser.toPOJO());
  }

  @Patch('/user/:id')
  @ApiOperation({ summary: 'Редактирование пользователя.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserRdo })
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto
  ) {
    const user = await this.authService.update(id, dto);
    return fillDto(UserRdo, user.toPOJO());
  }

  @Post('/questionnaire/:userId')
  @ApiOperation({ summary: 'Создание опросника пользователя.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserRdo })
  async createQuestionnaire(
    @Param('userId') userId: string,
    @Body() dto: CreateQuestionnaireDto
  ) {
    const user = await this.authService.addQuestionnaire(userId, dto);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Patch('/questionnaire/:userId')
  @ApiOperation({ summary: 'Создание опросника пользователя.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserRdo })
  async updateQuestionnaire(
    @Param('userId') userId: string,
    @Body() dto: UpdateQuestionnaireDto
  ) {
    const user = await this.authService.updateQuestionnaire(userId, dto);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

}
