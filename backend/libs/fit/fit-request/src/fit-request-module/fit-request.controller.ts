import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FitRequestService } from "./fit-request.service";
import { CreateRequestDto } from "./dto/create-request.dto";

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

  // @Get('/:userId')
  // @ApiOperation({ summary: 'Список покупок пользователя.' })
  // @ApiResponse({ status: HttpStatus.CREATED, type: FitRequestRdo })
  // @SerializeOptions({ type: FitRequestRdo })
  // public async findAllByUserId(@Param('userId') userId: string){
  //   const orders = await this.fitRequestService.findAllByUserId(userId);
  //   return orders;
  // }
}