import { BasePostgresRepository } from '@backend/data-access';
import { Injectable } from "@nestjs/common";
import { PrismaClientService } from '@backend/fit-models';
import { FitRequestEntity } from './fit-request.entity';
import { FitRequestFactory } from './fit-request.factory';
import { FitRequestQuery } from './fit-request.query';

@Injectable()
export class FitRequestRepository extends BasePostgresRepository<FitRequestEntity, Request> {
  constructor(
    entityFactory: FitRequestFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: FitRequestEntity): Promise<void> {
    const data = entity.toPOJO();
    const document = await this.client.request.create({ data });
    entity.id = document.id;
  }

  public async getRequestByUserId(query: FitRequestQuery) {
    const { initiatorId, userId } = query;
    const documents = await this.client.request.findMany({ where: { initiatorId, userId } });
    return documents[0];
  }
}