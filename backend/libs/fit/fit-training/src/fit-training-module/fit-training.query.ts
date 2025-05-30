import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsMongoId, IsNumber, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { DEFAULT_COUNT_BY_PAGE_LIMIT, DEFAULT_PAGE_COUNT, DEFAULT_SORT_DIRECTION, DEFAULT_SORT_FIELD, DefaultCalories, DefaultPrice, DefaultRating, SortDirection, SortField } from './fit-training.constant';
import { TrainingDuration, TrainingType } from '@backend/core';


export class FitTrainingQuery {
  @ApiProperty({ description: 'Количество записей на странице', required: false })
  @Transform(({ value }) => +value || DEFAULT_COUNT_BY_PAGE_LIMIT)
  @IsNumber()
  @IsOptional()
  readonly limit?: number = DEFAULT_COUNT_BY_PAGE_LIMIT;

  @ApiProperty({ description: 'Номер страницы', required: false })
  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page?: number = DEFAULT_PAGE_COUNT;

  @ApiProperty({ description: 'Поле для сортировки', enum: SortField, required: false })
  @IsEnum(SortField)
  @IsOptional()
  public sortField?: SortField = DEFAULT_SORT_FIELD;

  @ApiProperty({ description: 'Направление сортировки', enum: SortDirection, required: false })
  @IsEnum(SortDirection)
  @IsOptional()
  public sortDirection?: SortDirection = DEFAULT_SORT_DIRECTION;

  @ApiProperty({ description: 'Цена от', required: false })
  @Transform(({ value }) => +value)
  @IsOptional()
  @IsNumber()
  public minPrice?: number = DefaultPrice.Min;

  @ApiProperty({ description: 'Цена до', required: false })
  @Transform(({ value }) => +value)
  @IsOptional()
  @IsNumber()
  public maxPrice?: number;

  @ApiProperty({ description: 'Калории от', required: false })
  @Transform(({ value }) => +value)
  @IsOptional()
  @IsNumber()
  public minCalories?: number = DefaultCalories.Min;

  @ApiProperty({ description: 'Калории до', required: false })
  @Transform(({ value }) => +value)
  @IsOptional()
  @IsNumber()
  public maxCalories?: number;

  @ApiProperty({ description: 'Рейтинг от', required: false })
  @Transform(({ value }) => +value)
  @IsOptional()
  @IsNumber()
  public minRating?: number = DefaultRating.Min;

  @ApiProperty({ description: 'Рейтинг до', required: false })
  @Transform(({ value }) => +value)
  @IsOptional()
  @IsNumber()
  public maxRating?: number = DefaultRating.Max;

  @ApiProperty({ description: 'Тип тренировки', required: false, enum: TrainingType })
  @IsIn(Object.values(TrainingType), { each: true })
  @IsOptional()
  public trainingType?: TrainingType[];

  @ApiProperty({ description: 'Длительность тренировки', required: false, enum: TrainingDuration })
  @IsIn(Object.values(TrainingDuration), { each: true })
  @IsOptional()
  public trainingDuration?: TrainingDuration[];

  @ApiProperty({ description: 'Автор тренировки', required: false })
  @IsOptional()
  @IsMongoId()
  public userId?: string;
}