import { Injectable } from "@nestjs/common";
import { FitFeedbackRepository } from "./fit-feedback.repository";

@Injectable()
export class FitFeedbackService {
  constructor(
    private readonly fitFeedbackRepository: FitFeedbackRepository,
  ) { }
}