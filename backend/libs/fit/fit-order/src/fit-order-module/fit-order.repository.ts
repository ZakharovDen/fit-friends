import { BasePostgresRepository } from '@backend/data-access';
import { Injectable } from "@nestjs/common";
import { FitOrderEntity } from './fit-order.entity';
import { Order } from '@backend/core';
import { FitOrderFactory } from './fit-order.factory';
import { PrismaClientService } from '@backend/fit-models';

@Injectable()
export class FitOrderRepository extends BasePostgresRepository<FitOrderEntity, Order> {
  constructor(
    entityFactory: FitOrderFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: FitOrderEntity): Promise<void> {
    const data = entity.toPOJO();
    const document = await this.client.order.create({ data });
    entity.id = document.id;
  }
}