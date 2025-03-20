import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@backend/fit-models';
import { FitOrderController } from './fit-order.controller';
import { FitOrderFactory } from './fit-order.factory';
import { FitOrderRepository } from './fit-order.repository';
import { FitOrderService } from './fit-order.service';
import { FitOrderEntity } from './fit-order.entity';

@Module({
  imports: [PrismaClientModule],
  controllers: [FitOrderController],
  providers: [FitOrderFactory, FitOrderRepository, FitOrderService, FitOrderEntity],
  exports: [FitOrderService],
})
export class FitOrderModule {}
