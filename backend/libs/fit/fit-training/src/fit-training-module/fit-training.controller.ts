import { Body, Controller, Get, HttpStatus, Param, Post, Query, SerializeOptions } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FitTrainingService } from "./fit-training.service";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { fillDto } from '@backend/helpers';
import { FitTrainingRdo } from "./rdo/fit-training.rdo";
import { FitTrainingQuery } from "./fit-training.query";
import { FitTrainingWithPaginationRdo } from "./rdo/fit-training-with-pagination.rdo";

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
  @ApiResponse({ status: HttpStatus.OK, type: FitTrainingWithPaginationRdo })
  @SerializeOptions({ type: FitTrainingWithPaginationRdo })
  public async findAll(@Query() query?: FitTrainingQuery) {
    const trainings = await this.fitTrainingService.findAll(query);
    return trainings;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Детальная информация о тренировке.' })
  @ApiResponse({ status: HttpStatus.OK, type: FitTrainingRdo })
  @SerializeOptions({ type: FitTrainingRdo })
  public async findById(@Param('id') id: string) {
    const training = await this.fitTrainingService.findById(id);
    return training;
  }

}