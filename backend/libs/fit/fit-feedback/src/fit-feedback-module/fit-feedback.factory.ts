import { Injectable } from "@nestjs/common";
import { EntityFactory, Feedback } from "@backend/core";
import { FitFeedbackEntity } from "./fit-feedback.entity";

@Injectable()
export class FitFeedbackFactory implements EntityFactory<FitFeedbackEntity> {
  public create(entityPlainData: Feedback): FitFeedbackEntity {
    return new FitFeedbackEntity(entityPlainData);
  }
}