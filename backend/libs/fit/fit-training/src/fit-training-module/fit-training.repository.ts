import { Injectable, NotFoundException } from "@nestjs/common";
import { BasePostgresRepository } from '@backend/data-access';
import { FitTrainingEntity } from "./fit-training.entity";
import { PaginationResult, Sex, Training, TrainingDuration, TrainingLevel, TrainingType } from "@backend/core";
import { FitTrainingFactory } from "./fit-training.factory";
import { PrismaClientService } from "@backend/fit-models";
import { FitTrainingQuery } from "./fit-training.query";
import { Feedback, Prisma } from "@prisma/client";

@Injectable()
export class FitTrainingRepository extends BasePostgresRepository<FitTrainingEntity, Training> {
  constructor(
    entityFactory: FitTrainingFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private getAvgRating(feedbacks: Feedback[]): number {
    const rating = feedbacks.length > 0
      ? feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length
      : 0;
    return Math.round(rating * 10) / 10;
  }

  public async save(entity: FitTrainingEntity): Promise<void> {
    const data = entity.toPOJO();
    const record = await this.client.training.create({ data });

    entity.id = record.id;
  }

  public async findAll(query?: FitTrainingQuery): Promise<PaginationResult<FitTrainingEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit ? query?.limit : undefined;
    const where: Prisma.TrainingWhereInput = {};
    where.price = {
      gte: (query?.minPrice) ?? query.minPrice,
      lte: (query?.maxPrice) ?? query.maxPrice,
    }
    where.calories = {
      gte: (query?.minCalories) ?? query.minCalories,
      lte: (query?.maxCalories) ?? query.maxCalories,
    }
    if (query?.trainingType) {
      if (typeof query.trainingType === 'string') {
        where.type = {
          equals: query.trainingType
        }
      } else {
        where.type = {
          in: query.trainingType
        }
      }
    }

    const ratingTrainings = await this.client.feedback.groupBy({
      by: ['trainingId'],
      _avg: {
        rating: true
      },
      having: {
        rating: {
          _avg: {
            gte: query.minRating,
            lte: query.maxRating,
          },
        },
      },
    });
    const trainingIds = ratingTrainings.map((item) => item.trainingId);
    if (trainingIds.length === 1) {
      where.id = { equals: trainingIds[0] }
    } else {
      where.id = { in: trainingIds }
    }

    const [documents, trainingCount] = await Promise.all([
      this.client.training.findMany({ where, skip, take, include: { feedbacks: true } }),
      this.client.training.count({ where }),
    ]);
    return {
      entities: documents.map(
        (document) => this.createEntityFromDocument(
          {
            ...document,
            type: document.type as TrainingType,
            level: document.level as TrainingLevel,
            duration: document.duration as TrainingDuration,
            sex: document.sex as Sex,
            rating: this.getAvgRating(document.feedbacks)
            //rating: Math.round(ratingTrainings.find((item) => item.trainingId === document.id)._avg.rating * 10) / 10
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
    const document = await this.client.training.findUnique({ where: { id }, include: { feedbacks: true } });

    if (!document) {
      throw new NotFoundException(`Training with id = ${id} not found.`);
    }

    return this.createEntityFromDocument(
      {
        ...document,
        type: document.type as TrainingType,
        level: document.level as TrainingLevel,
        duration: document.duration as TrainingDuration,
        sex: document.sex as Sex,
        rating: this.getAvgRating(document.feedbacks)
      }
    );
  }

  public async getFilterValues() {
    const data = await this.client.training.aggregate(
      {
        _min: {
          price: true,
          calories: true
        },
        _max: {
          price: true,
          calories: true
        }
      }
    );
    return {
      price: {
        min: data._min.price,
        max: data._max.price
      },
      calories: {
        min: data._min.calories,
        max: data._max.calories
      },
    };
  }

}