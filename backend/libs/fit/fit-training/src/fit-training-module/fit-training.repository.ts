import { Injectable, NotFoundException } from "@nestjs/common";
import { BasePostgresRepository } from '@backend/data-access'
import { FitTrainingEntity } from "./fit-training.entity";
import { PaginationResult, Sex, Training, TrainingDuration, TrainingLevel, TrainingType } from "@backend/core";
import { FitTrainingFactory } from "./fit-training.factory";
import { PrismaClientService } from "@backend/fit-models";
import { FitTrainingQuery } from "./fit-training.query";

@Injectable()
export class FitTrainingRepository extends BasePostgresRepository<FitTrainingEntity, Training> {
  constructor(
    entityFactory: FitTrainingFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: FitTrainingEntity): Promise<void> {
    const data = entity.toPOJO();
    const record = await this.client.training.create({ data });

    entity.id = record.id;
  }

  public async findAll(query?: FitTrainingQuery): Promise<PaginationResult<FitTrainingEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit ? query?.limit : undefined;
    const [documents, trainingCount] = await Promise.all([
      this.client.training.findMany({ skip, take }),
      this.client.training.count(),
    ]);
    return {
      entities: documents.map(
        (document) => this.createEntityFromDocument(
          {
            ...document,
            type: document.type as TrainingType,
            level: document.level as TrainingLevel,
            duration: document.duration as TrainingDuration,
            sex: document.sex as Sex
          }
        )
      ),
      currentPage: query?.page,
      totalPages: Math.ceil(trainingCount / take),
      itemsPerPage: take,
      totalItems: trainingCount,
    }
  }

  public async findById(id: string): Promise<FitTrainingEntity> {
    const document = await this.client.training.findUnique({ where: { id } });

    if (!document) {
      throw new NotFoundException(`Training with id = ${id} not found.`);
    }

    return this.createEntityFromDocument(
      {
        ...document,
        type: document.type as TrainingType,
        level: document.level as TrainingLevel,
        duration: document.duration as TrainingDuration,
        sex: document.sex as Sex
      }
    );
  }

}