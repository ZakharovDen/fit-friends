import { Body, Controller, Get, HttpStatus, Param, Post, SerializeOptions } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FitOrderService } from "./fit-order.service";
import { FitOrderRdo } from "./rdo/fit-order.rdo";
import { CreateOrderDto } from "./dto/create-order.dto";

@ApiTags('Покупки (заказы)')
@Controller('orders')
export class FitOrderController {
  constructor(
    private readonly fitOrderService: FitOrderService,
  ) {}

  @Post('/')
  @ApiOperation({ summary: 'Создание заказа.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: FitOrderRdo })
  @SerializeOptions({ type: FitOrderRdo })
  public async create(@Body() dto: CreateOrderDto){
    const order = await this.fitOrderService.create(dto);
    return order;
  }

  @Get('/:userId')
  @ApiOperation({ summary: 'Список покупок пользователя.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: FitOrderRdo })
  @SerializeOptions({ type: FitOrderRdo })
  public async findAllByUserId(@Param('userId') userId: string){
    const orders = await this.fitOrderService.findAllByUserId(userId);
    return orders;
  }
}