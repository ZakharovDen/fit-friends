import { Body, Controller, HttpStatus, Post, SerializeOptions } from "@nestjs/common";
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
}