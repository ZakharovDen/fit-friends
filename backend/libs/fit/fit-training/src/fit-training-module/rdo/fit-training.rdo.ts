import { Sex, TrainingDuration, TrainingLevel, TrainingType } from "@backend/core";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class FitTrainingRdo {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()  
  @ApiProperty()
  userId: string;

  @Expose()  
  @ApiProperty()
  title: string;

  @Expose()  
  @ApiProperty()
  image: string;

  @Expose()  
  @ApiProperty()
  level: TrainingLevel;

  @Expose()  
  @ApiProperty()
  type: TrainingType;

  @Expose()  
  @ApiProperty()
  duration: TrainingDuration;

  @Expose()  
  @ApiProperty()
  price: number;

  @Expose()  
  @ApiProperty()
  calories: number;

  @Expose()  
  @ApiProperty()
  description: string;

  @Expose()  
  @ApiProperty()
  sex: Sex;

  @Expose()  
  @ApiProperty()
  video: string;

  @Expose()  
  @ApiProperty()
  specialOffer: boolean;

  @Expose()  
  @ApiProperty()
  createdAt: Date;

  @Expose()  
  @ApiProperty()
  updatedAt: Date;
}