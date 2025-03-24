import { Injectable } from "@nestjs/common";
import { FitTrainingRepository } from "./fit-training.repository";
import { FitTrainingEntity } from "./fit-training.entity";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { FitTrainingQuery } from "./fit-training.query";
import { PaginationResult } from "@backend/core";

@Injectable()
export class FitTrainingService {
  constructor(
    private readonly fitTrainingRepository: FitTrainingRepository,
    //private readonly notifyService: NotifyService
  ) { }

  public async create(dto: CreateTrainingDto): Promise<FitTrainingEntity> {
    const newTraining = new FitTrainingEntity({...dto, rating: undefined});
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
}