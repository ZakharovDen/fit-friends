import { Sex, TrainingDuration, TrainingLevel, TrainingType } from "@backend/core";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { TrainingFieldDescription } from "../fit-training.constant";

export class FitTrainingRdo {
  @Expose()
  @ApiProperty(TrainingFieldDescription.Id)
  id: string;

  @Expose()  
  @ApiProperty(TrainingFieldDescription.UserId)
  userId: string;

  @Expose()  
  @ApiProperty(TrainingFieldDescription.Title)
  title: string;

  @Expose()  
  @ApiProperty(TrainingFieldDescription.Image)
  image: string;

  @Expose()  
  @ApiProperty(TrainingFieldDescription.Level)
  level: TrainingLevel;

  @Expose()  
  @ApiProperty(TrainingFieldDescription.Type)
  type: TrainingType;

  @Expose()  
  @ApiProperty(TrainingFieldDescription.Duration)
  duration: TrainingDuration;

  @Expose()  
  @ApiProperty(TrainingFieldDescription.Price)
  price: number;

  @Expose()  
  @ApiProperty(TrainingFieldDescription.Calories)
  calories: number;

  @Expose()  
  @ApiProperty(TrainingFieldDescription.Description)
  description: string;

  @Expose()  
  @ApiProperty(TrainingFieldDescription.Sex)
  sex: Sex;

  @Expose()  
  @ApiProperty(TrainingFieldDescription.Video)
  video: string;

  @Expose()  
  @ApiProperty(TrainingFieldDescription.SpecialOffer)
  specialOffer: boolean;

  @Expose()
  @ApiProperty(TrainingFieldDescription.Rating)
  rating: number;

  @Expose()  
  @ApiProperty()
  createdAt: Date;

  @Expose()  
  @ApiProperty()
  updatedAt: Date;
}