import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { DEFAULT_COUNT_BY_PAGE_LIMIT, DEFAULT_PAGE_COUNT } from './fit-training.constant';


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

}