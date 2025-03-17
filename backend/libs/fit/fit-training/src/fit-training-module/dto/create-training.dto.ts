import { Sex, TrainingDuration, TrainingLevel, TrainingType } from "@backend/core";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { TrainingFieldDescription, TrainingValidateMessage, TrainingValidateValue } from "../fit-training.constant";

export class CreateTrainingDto {
  @ApiProperty(TrainingFieldDescription.UserId)
  @IsMongoId()
  userId: string;

  @ApiProperty(TrainingFieldDescription.Title)
  @IsString()
  @Length(
    TrainingValidateValue.Title.MinLength, 
    TrainingValidateValue.Title.MaxLength, 
    { message: TrainingValidateMessage.Title.LengthMessage }
  )
  title: string;

  @ApiProperty(TrainingFieldDescription.Image)
  @IsString()
  image: string;

  @ApiProperty(TrainingFieldDescription.Level)
  @IsEnum(TrainingLevel)
  level: TrainingLevel;

  @ApiProperty(TrainingFieldDescription.Type)
  @IsEnum(TrainingType)
  type: TrainingType;

  @ApiProperty(TrainingFieldDescription.Duration)
  @IsEnum(TrainingDuration)
  duration: TrainingDuration;

  @ApiProperty(TrainingFieldDescription.Price)
  @IsInt()
  @Min(TrainingValidateValue.Price.Min, {message: TrainingValidateMessage.Price.ValueMessage})
  price: number;

  @ApiProperty(TrainingFieldDescription.Calories)
  @IsInt()
  @Min(TrainingValidateValue.Calories.Min, {message: TrainingValidateMessage.Calories.ValueMessage})
  @Max(TrainingValidateValue.Calories.Max, {message: TrainingValidateMessage.Calories.ValueMessage})
  calories: number;

  @ApiProperty(TrainingFieldDescription.Description)
  @IsString()
  @Length(
    TrainingValidateValue.Description.MinLength, 
    TrainingValidateValue.Description.MaxLength, 
    { message: TrainingValidateMessage.Description.LengthMessage }
  )
 description: string;

  @ApiProperty(TrainingFieldDescription.Sex)
  @IsEnum(Sex)
  sex: Sex;

  @ApiProperty(TrainingFieldDescription.Video)
  @IsString()
  video: string;

  @ApiProperty(TrainingFieldDescription.SpecialOffer)
  @IsBoolean()
  specialOffer: boolean;
}