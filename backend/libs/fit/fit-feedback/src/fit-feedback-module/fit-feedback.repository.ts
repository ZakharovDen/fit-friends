import { BasePostgresRepository } from '@backend/data-access';
import { Injectable } from "@nestjs/common";
import { FitFeedbackEntity } from './fit-feedback.entity';
import { Feedback } from '@backend/core';
import { FitFeedbackFactory } from './fit-feedback.factory';
import { PrismaClientService } from '@backend/fit-models';

@Injectable()
export class FitFeedbackRepository extends BasePostgresRepository<FitFeedbackEntity, Feedback> {
  constructor(
    entityFactory: FitFeedbackFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: FitFeedbackEntity): Promise<void> {
    const data = entity.toPOJO();
    const document = await this.client.feedback.create({data});
    entity.id = document.id;
  }
}