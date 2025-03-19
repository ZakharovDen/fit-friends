import { ApiProperty } from "@nestjs/swagger";
import { FeedbackFieldDescription } from "../fit-feedback.constant";
import { Expose } from "class-transformer";

export class FitFeedBackRdo {
  @ApiProperty(FeedbackFieldDescription.Id)
  @Expose()
  id: string;

  @ApiProperty(FeedbackFieldDescription.UserId)
  @Expose()
  userId: string;

  @ApiProperty(FeedbackFieldDescription.TrainingId)
  @Expose()
  trainingId: string;

  @ApiProperty(FeedbackFieldDescription.Rating)
  @Expose()
  rating: number;

  @ApiProperty(FeedbackFieldDescription.Text)
  @Expose()
  text: string;

  @ApiProperty(FeedbackFieldDescription.CreatedAt)
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}