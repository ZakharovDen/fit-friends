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
    const document = await this.client.feedback.create({ data });
    entity.id = document.id;
  }

  public async findByTrainingId(trainingId: string): Promise<FitFeedbackEntity[]> {
    const documents = await this.client.feedback.findMany({ where: { trainingId } });
    return documents.map((document) => this.createEntityFromDocument(document));
  }
}