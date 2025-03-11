import { HttpService } from '@nestjs/axios';
import { Body, Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import 'multer';
import { AuthenticationResponseMessage, ChangePasswordDto, CreateUserDto, LoggedUserRdo, LoginUserDto, UserRdo } from '@backend/authentications';

import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CheckAnonymousGuard } from './guards/check-anonymous.guard';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { InjectUserIdInterceptor, ParseJsonBodyInterceptor } from '@backend/interceptors';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarParams } from './constant';
import { AppService } from './app.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { plainToInstance } from 'class-transformer';

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
    //const posts: PaginationResult<BlogPost> = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}`, { params: { userId: id } })).data;
    //data.countPosts = posts.totalItems;
    //data.countSubscribers = 0;
    return data;
  }

  @Post('register')
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
  @UseInterceptors(new ParseJsonBodyInterceptor())
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
    const newUser = plainToInstance(CreateUserDto, dto);
    if (avatar) {
      newUser.avatar = await this.appService.uploadFile(avatar);
    }
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, newUser);
    return data;
  }

  // @ApiOperation({ summary: 'Смена пароля пользователя.' })
  // @ApiResponse({
  //   type: UserRdo,
  //   status: HttpStatus.OK,
  // })
  // @ApiBearerAuth()
  // @UseGuards(CheckAuthGuard)
  // @UseInterceptors(InjectUserIdInterceptor)
  // @Patch('change-password')
  // public async changePassword(
  //   @Body() dto: ChangePasswordDto
  // ) {
  //   const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/change-password`, dto);
  //   return data;
  // }

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
    return data;
  }

  // @Post('refresh')
  // @ApiOperation({ summary: 'Получение новой пары токенов.' })
  // @ApiBearerAuth()
  // @UseGuards(CheckAuthGuard)
  // public async refreshToken(@Req() req: Request) {
  //   const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
  //     headers: {
  //       'Authorization': req.headers['authorization']
  //     }
  //   });

  //   return data;
  // }
}