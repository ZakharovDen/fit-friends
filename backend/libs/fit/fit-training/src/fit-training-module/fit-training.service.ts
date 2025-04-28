import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FitTrainingRepository } from "./fit-training.repository";
import { FitTrainingEntity } from "./fit-training.entity";
import { CreateFitTrainingDto } from "./dto/create-fit-training.dto";
import { FitTrainingQuery } from "./fit-training.query";
import { PaginationResult } from "@backend/core";
import { UpdateFitTrainingDto } from "./dto/update-fit-training.dto";

@Injectable()
export class FitTrainingService {
  constructor(
    private readonly fitTrainingRepository: FitTrainingRepository,
    //private readonly notifyService: NotifyService
  ) { }

  public async create(dto: CreateFitTrainingDto): Promise<FitTrainingEntity> {
    const newTraining = new FitTrainingEntity({...dto, rating: undefined, image: undefined, specialOffer: undefined, video: undefined });
    delete newTraining.rating;
    await this.fitTrainingRepository.save(newTraining);
    return newTraining;
  }

  public async update(id: string, userId: string, dto: UpdateFitTrainingDto) {
    const training = await this.findById(id);
    if (training.userId !== userId) {
      throw new HttpException('Запрещено редактировать чужие тренировки', HttpStatus.BAD_REQUEST);
    }
    const entity = new FitTrainingEntity(Object.assign(training, dto));
    delete entity.rating;
    await this.fitTrainingRepository.update(entity);
    return entity;
  }

  public async findAll(query?: FitTrainingQuery): Promise<PaginationResult<FitTrainingEntity>> {
    const result = await this.fitTrainingRepository.findAll(query);
    return result;
  }

  public async findById(id: string): Promise<FitTrainingEntity> {
    return await this.fitTrainingRepository.findById(id);
  }

  public async getFilterValues(authorId?: string) {
    return await this.fitTrainingRepository.getFilterValues(authorId);
  }

}