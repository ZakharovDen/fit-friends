import { BasePostgresRepository } from '@backend/data-access';
import { Injectable } from "@nestjs/common";
import { PrismaClientService } from '@backend/fit-models';
import { FitRequestEntity } from './fit-request.entity';
import { FitRequestFactory } from './fit-request.factory';

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

}