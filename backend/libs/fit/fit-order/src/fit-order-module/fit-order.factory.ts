import { Injectable } from "@nestjs/common";
import { EntityFactory, Order } from "@backend/core";
import { FitOrderEntity } from "./fit-order.entity";

@Injectable()
export class FitOrderFactory implements EntityFactory<FitOrderEntity> {
  public create(entityPlainData: Order): FitOrderEntity {
    return new FitOrderEntity(entityPlainData);
  }
}