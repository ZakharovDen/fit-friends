import { Injectable } from "@nestjs/common";
import { FitFeedbackRepository } from "./fit-feedback.repository";
import { CreateFeedBackDto } from "./dto/create-feedback.dto";
import { FitFeedbackEntity } from "./fit-feedback.entity";

@Injectable()
export class FitFeedbackService {
  constructor(
    private readonly fitFeedbackRepository: FitFeedbackRepository,
  ) { }

  public async create(dto: CreateFeedBackDto){
    const newFeedback = new FitFeedbackEntity(dto);
    await this.fitFeedbackRepository.save(newFeedback);
    return newFeedback;
  }
}