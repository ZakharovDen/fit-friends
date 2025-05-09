import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, SerializeOptions } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FitTrainingService } from "./fit-training.service";
import { CreateFitTrainingDto } from "./dto/create-fit-training.dto";
import { fillDto } from '@backend/helpers';
import { FitTrainingRdo } from "./rdo/fit-training.rdo";
import { FitTrainingQuery } from "./fit-training.query";
import { FitTrainingWithPaginationRdo } from "./rdo/fit-training-with-pagination.rdo";
import { UpdateFitTrainingDto } from "./dto/update-fit-training.dto";

@ApiTags('Тренировки')
@Controller('trainings')
export class FitTrainingController {
  constructor(
    private readonly fitTrainingService: FitTrainingService,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'Создание тренировки.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: FitTrainingRdo })
  public async create(@Body() dto: CreateFitTrainingDto) {
    const training = await this.fitTrainingService.create(dto);
    return fillDto(FitTrainingRdo, training);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Редактирование тренировки.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: FitTrainingRdo })
  public async update(
    @Body() dto: UpdateFitTrainingDto,
    @Param('id') id: string,
    @Query('userId') userId: string,
  ) {
    const training = await this.fitTrainingService.update(id, userId, dto);
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

  @Get('/filter-values')
  @ApiOperation({ summary: 'Минимальные и максимальные значения для фильтров.' })
  public async getFilterValues(
    @Query('authorId') authorId?: string
  ){
    return await this.fitTrainingService.getFilterValues(authorId);
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