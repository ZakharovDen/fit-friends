import { Injectable } from "@nestjs/common";
import { FitTrainingEntity } from "./fit-training.entity";
import { EntityFactory, Training } from "@backend/core";

@Injectable()
export class FitTrainingFactory implements EntityFactory<FitTrainingEntity> {
  public create(entityPlainData: Training): FitTrainingEntity {
    return new FitTrainingEntity(entityPlainData);
  }
}