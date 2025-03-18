import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationRdo } from '@backend/core';
import { FitTrainingRdo } from './fit-training.rdo';

export class BlogPostWithPaginationRdo extends PaginationRdo {
  @Expose()
  @ApiProperty({ description: 'Данные', type: [FitTrainingRdo] })
  @Type(() => FitTrainingRdo)
  public entities: FitTrainingRdo[];
}