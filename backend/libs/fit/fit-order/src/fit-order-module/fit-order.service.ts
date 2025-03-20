import { Injectable } from "@nestjs/common";
import { FitOrderRepository } from "./fit-order.repository";
import { FitOrderEntity } from "./fit-order.entity";
import { FitTrainingService } from '@backend/fit-training';
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class FitOrderService {
  constructor(
    private readonly fitOrderRepository: FitOrderRepository,
    private readonly fitTrainingService: FitTrainingService,
  ) { }

  public async create(dto: CreateOrderDto){
    await this.fitTrainingService.findById(dto.trainingId);
    const newOrder = new FitOrderEntity(dto);
    await this.fitOrderRepository.save(newOrder);
    return newOrder;
  }
}