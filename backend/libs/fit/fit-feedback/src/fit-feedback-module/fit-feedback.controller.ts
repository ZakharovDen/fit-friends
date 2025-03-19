import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { FitFeedbackService } from "./fit-feedback.service";

@ApiTags('Отзывы')
@Controller('feedbacks')
export class FitFeedbackController {
  constructor(
    private readonly fitFeedbackService: FitFeedbackService,
  ) {}
}