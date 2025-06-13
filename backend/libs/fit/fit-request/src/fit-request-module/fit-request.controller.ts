import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, SerializeOptions } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FitRequestService } from "./fit-request.service";
import { CreateFitRequestDto } from "./dto/create-fit-request.dto";
import { FitRequestQuery } from "./fit-request.query";
import { UpdateFitRequestDto } from "./dto/update-fit-request.dto";
import { FitRequestRdo } from "./rdo/fit-request.rdo";

@ApiTags('Заявки (запросы) на тренировку')
@Controller('requests')
export class FitRequestController {
  constructor(
    private readonly fitRequestService: FitRequestService,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'Создание запроса на тренировку.' })
  @ApiResponse({ status: HttpStatus.CREATED })
  @SerializeOptions({type: FitRequestRdo})
  public async create(@Body() dto: CreateFitRequestDto){
    const request = await this.fitRequestService.create(dto);
    return request;
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Редактирование запроса на тренировку.' })
  @ApiResponse({ status: HttpStatus.CREATED })
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateFitRequestDto
  ){
    const request = await this.fitRequestService.update(id, dto);
    return request;
  }

  @Get('/')
  @ApiOperation({ summary: 'Получение информации о запросе на тренировку.' })
  @ApiResponse({ status: HttpStatus.OK })
  public async getRequestByUserId(@Query() query: FitRequestQuery){
    const request = await this.fitRequestService.getRequestByUserId(query);
    return request;
  }
  
}