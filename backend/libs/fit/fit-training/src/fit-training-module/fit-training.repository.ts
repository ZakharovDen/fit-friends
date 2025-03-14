import { Injectable } from "@nestjs/common";
import { BasePostgresRepository } from '@backend/data-access'
import { FitTrainingEntity } from "./fit-training.entity";
import { Training } from "@backend/core";
import { FitTrainingFactory } from "./fit-training.factory";
import { PrismaClientService } from "@backend/fit-models";

@Injectable()
export class FitTrainingRepository extends BasePostgresRepository<FitTrainingEntity, Training> {
  constructor(
    entityFactory: FitTrainingFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }
}