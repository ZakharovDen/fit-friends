import { Injectable } from "@nestjs/common";
import { FitTrainingRepository } from "./fit-training.repository";
import { FitTrainingEntity } from "./fit-training.entity";
import { CreateTrainingDto } from "./dto/create-training.dto";

@Injectable()
export class FitTrainingService {
  constructor(
    private readonly fitTrainingRepository: FitTrainingRepository,
    //private readonly notifyService: NotifyService
  ) { }

  public async create(dto: CreateTrainingDto): Promise<FitTrainingEntity> {
    const newTraining = new FitTrainingEntity(dto);
    await this.fitTrainingRepository.save(newTraining);
    return newTraining;
  }
}