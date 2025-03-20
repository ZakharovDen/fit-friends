import { Injectable, NotFoundException } from "@nestjs/common";
import { FitFeedbackRepository } from "./fit-feedback.repository";
import { CreateFeedBackDto } from "./dto/create-feedback.dto";
import { FitFeedbackEntity } from "./fit-feedback.entity";
import { FitTrainingService } from '@backend/fit-training';

@Injectable()
export class FitFeedbackService {
  constructor(
    private readonly fitFeedbackRepository: FitFeedbackRepository,
    private readonly fitTrainingService: FitTrainingService,
  ) { }

  public async create(dto: CreateFeedBackDto){
    await this.fitTrainingService.findById(dto.trainingId);
    const newFeedback = new FitFeedbackEntity(dto);
    await this.fitFeedbackRepository.save(newFeedback);
    return newFeedback;
  }

  public async findByTrainingId(trainingId: string) {
    await this.fitTrainingService.findById(trainingId);
    return await this.fitFeedbackRepository.findByTrainingId(trainingId);
  }
}