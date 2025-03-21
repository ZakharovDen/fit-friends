import { BasePostgresRepository } from '@backend/data-access';
import { Injectable } from "@nestjs/common";
import { FitOrderEntity } from './fit-order.entity';
import { Order, PaymentMethod } from '@backend/core';
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

  public async findAllByUserId(userId: string) {
    const documents = await this.client.order.findMany({ where: { userId } });
    return documents.map((document) => this.createEntityFromDocument(
      { 
        ...document, 
        paymentMethod: document.paymentMethod as PaymentMethod 
      }
    ));
  }
}