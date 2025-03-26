import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseFilters, UseGuards } from "@nestjs/common";
import { AxiosExceptionFilter } from "./filters/axios-exception.filter";
import { HttpService } from "@nestjs/axios";
import { ApplicationServiceURL } from "./app.config";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { FitTrainingQuery, FitTrainingRdo, FitTrainingWithPaginationRdo } from '@backend/fit-training';
import { CheckAuthGuard } from "./guards/check-auth.guard";
import { CreateFeedBackDto, FitFeedBackRdo } from '@backend/fit-feedback';

@Controller('fit')
@UseFilters(AxiosExceptionFilter)
export class FitController {
  constructor(
    private readonly httpService: HttpService,
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

  @Get('trainings/:id')
  @ApiOperation({ summary: 'Детальная информация о тренировке.' })
  @ApiResponse({ status: HttpStatus.OK, type: FitTrainingRdo })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  public async getTrainingById(@Param('id') id: string) {
    const training = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.FitTrainings}/${id}`)).data;
    return training;
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
  @ApiResponse({ status: HttpStatus.OK, type: [FitFeedBackRdo] })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  public async findByTrainingId(@Param('trainingId') trainingId: string){
    const feedbacks = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.FitFeedbacks}/${trainingId}`)).data;
    return feedbacks;
  }
}