import { ApiProperty } from "@nestjs/swagger";
import { FeedbackFieldDescription, FeedbackValidateMessage, FeedbackValidateValue } from "../fit-feedback.constant";
import { IsInt, IsMongoId, IsUUID, Length, Max, Min } from 'class-validator';

export class CreateFeedBackDto {
  @ApiProperty(FeedbackFieldDescription.UserId)
  @IsMongoId()
  userId: string;

  @ApiProperty(FeedbackFieldDescription.TrainingId)
  @IsUUID()
  trainingId: string;

  @ApiProperty(FeedbackFieldDescription.Rating)
  @IsInt()
  @Min(FeedbackValidateValue.Rating.Min, { message: FeedbackValidateMessage.Rating.ValueMessage })
  @Max(FeedbackValidateValue.Rating.Max, { message: FeedbackValidateMessage.Rating.ValueMessage })
  rating: number;

  @ApiProperty(FeedbackFieldDescription.Text)
  @Length(
    FeedbackValidateValue.Text.MinLength, 
    FeedbackValidateValue.Text.MaxLength, 
    { message: FeedbackValidateMessage.Text.LengthMessage }
  )
  text: string;
}