import { Injectable } from "@nestjs/common";
import { FitTrainingRepository } from "./fit-training.repository";
import { FitTrainingEntity } from "./fit-training.entity";
import { CreateFitTrainingDto } from "./dto/create-fit-training.dto";
import { FitTrainingQuery } from "./fit-training.query";
import { PaginationResult } from "@backend/core";

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

  public async findAll(query?: FitTrainingQuery): Promise<PaginationResult<FitTrainingEntity>> {
    const result = await this.fitTrainingRepository.findAll(query);
    return result;
  }

  public async findById(id: string): Promise<FitTrainingEntity> {
    return await this.fitTrainingRepository.findById(id);
  }

  public async getFilterValues() {
    return await this.fitTrainingRepository.getFilterValues();
  }

}