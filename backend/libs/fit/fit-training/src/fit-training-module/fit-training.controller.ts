import { Body, Controller, Get, HttpStatus, Post, Query, SerializeOptions } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FitTrainingService } from "./fit-training.service";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { fillDto } from '@backend/helpers';
import { FitTrainingRdo } from "./rdo/fit-training.rdo";
import { FitTrainingQuery } from "./fit-training.query";
import { BlogPostWithPaginationRdo } from "./rdo/fit-training-with-pagination.rdo";

@ApiTags('Тренировки')
@Controller('trainings')
export class FitTrainingController {
  constructor(
    private readonly fitTrainingService: FitTrainingService,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'Создание тренировки.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: FitTrainingRdo })
  public async create(@Body() dto: CreateTrainingDto) {
    console.log('post qqq');
    const training = await this.fitTrainingService.create(dto);
    return fillDto(FitTrainingRdo, training);
  }

  @Get('/')
  @ApiOperation({ summary: 'Список тренировок.' })
  @ApiResponse({ status: HttpStatus.OK, type: BlogPostWithPaginationRdo })
  @SerializeOptions({ type: BlogPostWithPaginationRdo })
  public async getAll(@Query() query?: FitTrainingQuery) {
    const trainings = await this.fitTrainingService.getAll(query);
    return trainings;
    //return fillDto(BlogPostWithPaginationRdo, trainings);
  }
}