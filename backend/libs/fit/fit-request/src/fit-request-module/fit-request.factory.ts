import { Injectable } from "@nestjs/common";
import { EntityFactory, Request } from "@backend/core";
import { FitRequestEntity } from "./fit-request.entity";

@Injectable()
export class FitRequestFactory implements EntityFactory<FitRequestEntity> {
  public create(entityPlainData: Request): FitRequestEntity {
    return new FitRequestEntity(entityPlainData);
  }
}