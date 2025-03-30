import { TrainingDuration, TrainingLevel, TrainingType } from '@backend/core';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsBoolean, IsEnum, IsInt, Max, Min } from 'class-validator';
import { QuestionnaireDescription, QuestionnaireValidateMessage, QuestionnaireValidateValue } from '../authentication-module/authentication.constant';

export class CreateQuestionnaireDto {
  @IsEnum(TrainingLevel)
  @ApiProperty(QuestionnaireDescription.Level)
  level: TrainingLevel;

  @IsArray()
  @ArrayMaxSize(QuestionnaireValidateValue.Types.MaxArraySize)
  @IsEnum(TrainingType, { each: true })
  @ApiProperty(QuestionnaireDescription.Types)
  types: TrainingType[];

  @IsEnum(TrainingDuration)
  @ApiProperty(QuestionnaireDescription.Duration)
  duration: TrainingDuration;

  @IsInt()
  @Min(QuestionnaireValidateValue.CaloriesTotal.Min, {message: QuestionnaireValidateMessage.CaloriesTotal})
  @Max(QuestionnaireValidateValue.CaloriesTotal.Max, {message: QuestionnaireValidateMessage.CaloriesTotal})
  @ApiProperty(QuestionnaireDescription.CaloriesTotal)
  caloriesTotal: number;

  @IsInt()
  @Min(QuestionnaireValidateValue.CaloriesByDay.Min, {message: QuestionnaireValidateMessage.CaloriesByDay})
  @Max(QuestionnaireValidateValue.CaloriesByDay.Max, {message: QuestionnaireValidateMessage.CaloriesByDay})
  @ApiProperty(QuestionnaireDescription.CaloriesByDay)
  caloriesByDay: number;

  @IsBoolean()
  @ApiProperty(QuestionnaireDescription.IsReady)
  isReady: boolean;
}