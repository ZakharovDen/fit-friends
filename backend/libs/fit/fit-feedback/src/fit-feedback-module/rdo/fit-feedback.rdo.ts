import { ApiProperty } from "@nestjs/swagger";
import { FeedbackFieldDescription } from "../fit-feedback.constant";

export class FitFeedBackRdo {
  @ApiProperty(FeedbackFieldDescription.Id)
  id: string;

  @ApiProperty(FeedbackFieldDescription.UserId)
  userId: string;

  @ApiProperty(FeedbackFieldDescription.TrainingId)
  trainingId: string;

  @ApiProperty(FeedbackFieldDescription.Rating)
  rating: number;

  @ApiProperty(FeedbackFieldDescription.Text)
  text: string;

  @ApiProperty(FeedbackFieldDescription.CreatedAt)
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}