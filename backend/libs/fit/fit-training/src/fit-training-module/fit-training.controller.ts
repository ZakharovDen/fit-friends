import { Body, Controller, Get, HttpStatus, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FitTrainingService } from "./fit-training.service";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { fillDto } from '@backend/helpers';
import { FitTrainingRdo } from "./rdo/fit-training.rdo";

@ApiTags('Тренировки')
@Controller('trainings')
export class FitTrainingController {
  constructor(
    private readonly fitTrainingService: FitTrainingService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создание тренировки.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: [FitTrainingRdo] })
  public async create(@Body() dto: CreateTrainingDto) {
    const posts = await this.fitTrainingService.create(dto);
    return fillDto(FitTrainingRdo, posts);
  }
}