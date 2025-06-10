import { Body, Controller, Get, HttpStatus, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FitRequestService } from "./fit-request.service";
import { CreateRequestDto } from "./dto/create-request.dto";
import { FitRequestQuery } from "./fit-request.query";

@ApiTags('Заявки (запросы) на тренировку')
@Controller('requests')
export class FitRequestController {
  constructor(
    private readonly fitRequestService: FitRequestService,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'Создание запроса на тренировку.' })
  @ApiResponse({ status: HttpStatus.CREATED })
  public async create(@Body() dto: CreateRequestDto){
    const request = await this.fitRequestService.create(dto);
    return request;
  }

  @Get('/')
  @ApiOperation({ summary: 'Получение информации о запросе на тренировку.' })
  @ApiResponse({ status: HttpStatus.OK })
  public async getRequestByUserId(@Query() query: FitRequestQuery){
    const order = await this.fitRequestService.getRequestByUserId(query);
    return order;
  }
}