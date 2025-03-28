import { Body, Controller, Get, HttpStatus, Param, Post, Query, SerializeOptions, UseFilters, UseGuards } from "@nestjs/common";
import { AxiosExceptionFilter } from "./filters/axios-exception.filter";
import { HttpService } from "@nestjs/axios";
import { ApplicationServiceURL } from "./app.config";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { FitTrainingQuery, FitTrainingRdo, FitTrainingWithPaginationRdo } from '@backend/fit-training';
import { CheckAuthGuard } from "./guards/check-auth.guard";
import { CreateFeedBackDto, FitFeedBackRdo } from '@backend/fit-feedback';
import { UserRdo } from "@backend/authentications";
import { TrainingWithUserRdo } from "./rdo/training-with-user.rdo";
import { AppService } from "./app.service";
import { FeedbackWithUserRdo } from "./rdo/feedback-with-user.rdo";

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
  public async getAllTrainings(@Query() query?: FitTrainingQuery): Promise<FitTrainingWithPaginationRdo> {
    const trainings: FitTrainingWithPaginationRdo = (await this.httpService.axiosRef.get(ApplicationServiceURL.FitTrainings, { params: query })).data;
    return {
      ...trainings, 
      entities: trainings.entities.map((entity) => ({...entity, image: `${ApplicationServiceURL.File}/static${entity.image}`}))
    };
  }

  @Get('/filter-values')
  @ApiOperation({ summary: 'Минимальные и максимальные значения для фильтров.' })
  public async getFilterValues(){
    const {data} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.FitTrainings}/filter-values`)
    return data;
  }

  @Get('trainings/:id')
  @ApiOperation({ summary: 'Детальная информация о тренировке.' })
  @ApiResponse({ status: HttpStatus.OK, type: TrainingWithUserRdo })
  @SerializeOptions({ type: TrainingWithUserRdo })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  public async getTrainingById(@Param('id') id: string) {
    const training: FitTrainingRdo = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.FitTrainings}/${id}`)).data;
    const user: UserRdo = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${training.userId}`)).data;
    const trainingWithUser: TrainingWithUserRdo = {...training, user: {...user, avatar: `${ApplicationServiceURL.File}/static${user.avatar}`}};
    return trainingWithUser;
  }

  @Post('feedback')
  @ApiOperation({ summary: 'Создание отзыва.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: FitFeedBackRdo })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  public async create(@Body() dto: CreateFeedBackDto){
    const feedback = (await this.httpService.axiosRef.post(ApplicationServiceURL.FitFeedbacks, dto)).data;
    return feedback;
  }

  @Get('feedback/:trainingId')
  @ApiOperation({ summary: 'Список отзывов к тренировке.' })
  @ApiResponse({ status: HttpStatus.OK, type: [FeedbackWithUserRdo] })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @SerializeOptions({ type: FeedbackWithUserRdo })
  public async findByTrainingId(@Param('trainingId') trainingId: string){
    const feedbacks = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.FitFeedbacks}/${trainingId}`)).data;
    await this.appService.appendUser(feedbacks);
    return feedbacks.map((feedback) => ({...feedback, user: {...feedback.user, avatar: `${ApplicationServiceURL.File}/static${feedback.user.avatar}`}}));
  }
}