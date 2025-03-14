import { Injectable } from "@nestjs/common";
import { FitTrainingRepository } from "./fit-training.repository";
import { FitTrainingEntity } from "./fit-training.entity";
import { FitTrainingFactory } from "./fit-training.factory";
import { CreateTrainingDto } from "./dto/create-training.dto";

@Injectable()
export class FitTrainingService {
  constructor(
    private readonly blogPostRepository: FitTrainingRepository,
    //private readonly notifyService: NotifyService
  ) { }

  public async create(dto: CreateTrainingDto): Promise<FitTrainingEntity> {
    return new FitTrainingEntity();
  }
}