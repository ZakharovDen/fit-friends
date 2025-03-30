import { TrainingDuration, TrainingLevel, TrainingType } from "@backend/core";
import { Expose } from "class-transformer";
import { QuestionnaireDescription } from "../authentication-module/authentication.constant";
import { ApiProperty } from "@nestjs/swagger";

export class QuestionnaireRdo {
  @Expose()  
  @ApiProperty(QuestionnaireDescription.Level)
  level: TrainingLevel;

  @Expose()  
  @ApiProperty(QuestionnaireDescription.Types)
  types: TrainingType[];

  @Expose()  
  @ApiProperty(QuestionnaireDescription.Duration)
  duration: TrainingDuration;

  @Expose()  
  @ApiProperty(QuestionnaireDescription.CaloriesTotal)
  caloriesTotal: number;

  @Expose()  
  @ApiProperty(QuestionnaireDescription.CaloriesByDay)
  caloriesByDay: number;

  @Expose()  
  @ApiProperty(QuestionnaireDescription.IsReady)
  isReady: boolean;
}