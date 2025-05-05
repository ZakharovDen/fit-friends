import { Body, Controller, FileTypeValidator, Get, HttpStatus, Param, ParseFilePipe, Patch, Post, Query, SerializeOptions, UploadedFile, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { AxiosExceptionFilter } from "./filters/axios-exception.filter";
import { HttpService } from "@nestjs/axios";
import { ApplicationServiceURL } from "./app.config";
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateFitTrainingDto, FitTrainingQuery, FitTrainingRdo, FitTrainingWithPaginationRdo, SortDirection, SortField } from '@backend/fit-training';
import { CheckAuthGuard } from "./guards/check-auth.guard";
import { CreateFeedBackDto, FitFeedBackRdo } from '@backend/fit-feedback';
import { UserRdo } from "@backend/authentications";
import { TrainingWithUserRdo } from "./rdo/training-with-user.rdo";
import { AppService } from "./app.service";
import { FeedbackWithUserRdo } from "./rdo/feedback-with-user.rdo";
import { UserId } from "./decorators/user-id.decorator";
import { InjectUserIdInterceptor } from "@backend/interceptors";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateTrainingDto } from "./dto/update-training.dto";
import { Roles } from "./decorators/roles.decorator";
import { Feedback, UserRole } from "@backend/core";
import { RolesGuard } from "./guards/roles.guard";
import { PathInterceptor } from "./interceptors/path.interceptor";
import { plainToInstance } from "class-transformer";
import { LoadVideoDto } from "./dto/load-video.dto";

@Controller('fit')
@UseFilters(AxiosExceptionFilter)
export class FitController {
  constructor(
    private readonly httpService: HttpService,
    private readonly appService: AppService,
  ) { }

  @Get('trainings')
  @ApiOperation({ summary: 'Список тренировок.' })
  @ApiResponse({ status: HttpStatus.OK, type: FitTrainingWithPaginationRdo })
  @UseInterceptors(new PathInterceptor({ fields: 'image' }))
  public async getAllTrainings(@Query() query?: FitTrainingQuery): Promise<FitTrainingWithPaginationRdo> {
    const trainings: FitTrainingWithPaginationRdo = (await this.httpService.axiosRef.get(ApplicationServiceURL.FitTrainings, { params: query })).data;
    return trainings;
  }

  @Get('my-trainings')
  @ApiOperation({ summary: 'Список тренировок автора (тренера).' })
  @ApiResponse({ status: HttpStatus.OK, type: FitTrainingWithPaginationRdo })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard, RolesGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Roles(UserRole.Coach)
  @UseInterceptors(new PathInterceptor({ fields: ['image', 'video'] }))
  public async getMyTrainings(
    @UserId() userId: string,
    @Query() query?: FitTrainingQuery
  ): Promise<FitTrainingWithPaginationRdo> {
    query.sortField = SortField.CreateDate;
    query.sortDirection = SortDirection.Desc;
    const trainings: FitTrainingWithPaginationRdo = (await this.httpService.axiosRef.get(ApplicationServiceURL.FitTrainings, { params: { ...query, userId } })).data;
    return trainings;
  }

  @Get('/filter-values')
  @ApiOperation({ summary: 'Минимальные и максимальные значения для фильтров.' })
  public async getFilterValues(
    @Query('authorId') authorId?: string
  ) {
    const params = (authorId) ? { authorId: authorId } : {};
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.FitTrainings}/filter-values`, { params: params })
    return data;
  }

  @Get('trainings/:id')
  @ApiOperation({ summary: 'Детальная информация о тренировке.' })
  @ApiResponse({ status: HttpStatus.OK, type: TrainingWithUserRdo })
  @SerializeOptions({ type: TrainingWithUserRdo })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(new PathInterceptor({ fields: ['user.avatar', 'video'] }))
  public async getTrainingById(@Param('id') id: string) {
    const training: FitTrainingRdo = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.FitTrainings}/${id}`)).data;
    const user: UserRdo = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${training.userId}`)).data;
    const trainingWithUser: TrainingWithUserRdo = { ...training, user };
    return trainingWithUser;
  }

  @Post('feedback')
  @ApiOperation({ summary: 'Создание отзыва.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: FitFeedBackRdo })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(new PathInterceptor({ fields: 'user.avatar' }))
  public async create(
    @Body() dto: CreateFeedBackDto,
    @UserId() userId: string
  ) {
    dto.userId = userId;
    const feedback: Feedback = (await this.httpService.axiosRef.post(ApplicationServiceURL.FitFeedbacks, dto)).data;
    return await this.appService.appendUser([feedback]);
  }

  @Get('feedback/:trainingId')
  @ApiOperation({ summary: 'Список отзывов к тренировке.' })
  @ApiResponse({ status: HttpStatus.OK, type: [FeedbackWithUserRdo] })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @SerializeOptions({ type: FeedbackWithUserRdo })
  @UseInterceptors(new PathInterceptor({ fields: 'user.avatar' }))
  public async findByTrainingId(
    @Param('trainingId') trainingId: string
  ) {
    const feedbacks: Feedback[] = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.FitFeedbacks}/${trainingId}`)).data;
    const feedbacksWithUser = await this.appService.appendUser(feedbacks);
    return feedbacksWithUser;
  }

  @Post('trainings')
  @ApiOperation({ summary: 'Создание тренировки.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: FitTrainingRdo })
  @UseInterceptors(FileInterceptor('video'))
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard, RolesGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Roles(UserRole.Coach)
  @UseInterceptors(new PathInterceptor({ fields: ['image', 'video'] }))
  public async createTraining(
    @UserId() userId: string,
    @Body() dto: CreateTrainingDto,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: /(mov|avi|mp4)$/ }),
      ],
      fileIsRequired: false,
    }),) video: Express.Multer.File
  ): Promise<FitTrainingRdo> {
    const newTraining = plainToInstance(CreateFitTrainingDto, dto);
    if (video) {
      newTraining.video = await this.appService.uploadFile(video);
    }
    const training: FitTrainingRdo = (await this.httpService.axiosRef.post(ApplicationServiceURL.FitTrainings, { ...newTraining, userId })).data;
    return training;
  }

  @Patch('trainings/:id')
  @ApiOperation({ summary: 'Редактирование тренировки.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: FitTrainingRdo })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard, RolesGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Roles(UserRole.Coach)
  @UseInterceptors(new PathInterceptor({ fields: ['image', 'video'] }))
  public async updateTraining(
    @UserId() userId: string,
    @Body() dto: UpdateTrainingDto,
    @Param('id') id: string,
  ): Promise<FitTrainingRdo> {
    const prefix = `${ApplicationServiceURL.File}/static`;
    const training: FitTrainingRdo = (await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.FitTrainings}/${id}`,
      { ...dto, video: dto.video.replace(prefix, '') },
      { params: { userId } })
    ).data;
    return training;
  }

  @Post('trainings-video')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Загрузить видео.' })
  @UseInterceptors(FileInterceptor('video'))
  @UseInterceptors(new PathInterceptor({ fields: ['videoUrl'] }))
  public async loadVideo(
    @Body() dto: LoadVideoDto,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: /(mov|avi|mp4)$/ }),
      ],
      fileIsRequired: false,
    }),) video: Express.Multer.File
  ) {
    let videoUrl = '';
    if (video) {
      videoUrl = await this.appService.uploadFile(video);
    }
    return { videoUrl };
  }

}