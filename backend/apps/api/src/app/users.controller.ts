import { HttpService } from '@nestjs/axios';
import { Body, Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, 
        ParseFilePipe, Patch, Post, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import 'multer';
import { AuthenticationResponseMessage, CreateQuestionnaireDto, CreateUserDto, LoggedUserRdo, LoginUserDto, UpdateQuestionnaireDto, UpdateUserDto, UserRdo } from '@backend/authentications';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CheckAnonymousGuard } from './guards/check-anonymous.guard';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@backend/interceptors';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarParams } from './constant';
import { AppService } from './app.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserId } from './decorators/user-id.decorator';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
    private readonly appService: AppService,
  ) { }

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
  public async getById(@Param('id') id: string): Promise<UserRdo> {
    const data: UserRdo = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`)).data;
    return {...data, avatar: `${ApplicationServiceURL.File}/static${data.avatar}`};
  }

  @Post()
  @ApiOperation({ summary: 'Регистрация пользователя.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.UserExist,
  })
  @ApiBearerAuth()
  @UseGuards(CheckAnonymousGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  public async create(
    @Body() dto: RegisterUserDto,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: AvatarParams.MaxSize }),
        new FileTypeValidator({ fileType: AvatarParams.FileType }),
      ],
      fileIsRequired: false,
    }),) avatar?: Express.Multer.File
  ) {
    console.dir(dto);
    const newUser = plainToInstance(CreateUserDto, dto);
    if (avatar) {
      newUser.avatar = await this.appService.uploadFile(avatar);
    }
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, newUser);
    return {...data, avatar: `${ApplicationServiceURL.File}/static${data.avatar}`};
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
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return {...data, avatar: `${ApplicationServiceURL.File}/static${data.avatar}`};
  }

  @ApiOperation({ summary: 'Редактирование пользователя.' })
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
  })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Patch()
  public async changePassword(
    @UserId() userId: string,
    @Body() dto: UpdateUserDto
  ) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/user/${userId}`, dto);
    return {...data, avatar: `${ApplicationServiceURL.File}/static${data.avatar}`};
  }

  @ApiOperation({ summary: 'Проверка состояния пользователя' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Пользователь авторизован' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Пользователь не авторизован' })
  @ApiBearerAuth()
  @Post('check')
  public async checkToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/check`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return {...data, avatar: `${ApplicationServiceURL.File}/static${data.avatar}`};;
  }

  @Post('/questionnaire')
  @ApiOperation({ summary: 'Создание опросника пользователя.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserRdo })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  async createQuestionnaire(
    @UserId() userId: string,
    @Body() dto: CreateQuestionnaireDto
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/questionnaire/${userId}`, dto);
    return {...data, avatar: `${ApplicationServiceURL.File}/static${data.avatar}`};
  }

  @Patch('/questionnaire')
  @ApiOperation({ summary: 'Редактирование опросника пользователя.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserRdo })
  async updateQuestionnaire(
    @UserId() userId: string,
    @Body() dto: UpdateQuestionnaireDto
  ) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/questionnaire/${userId}`, dto);
    return {...data, avatar: `${ApplicationServiceURL.File}/static${data.avatar}`};
  }
}