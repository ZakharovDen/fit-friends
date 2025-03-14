import { Sex, TrainingDuration, TrainingLevel, TrainingType } from "@backend/core";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId } from 'class-validator';

export class CreateTrainingDto {
  @ApiProperty()  
  @IsMongoId()
  userId: string;
    
  @ApiProperty()  
  title: string;

  @ApiProperty()  
  image: string;

  @ApiProperty()  
  @IsEnum(TrainingLevel)
  level: TrainingLevel;

  @ApiProperty()  
  @IsEnum(TrainingType)
  type: TrainingType;

  @ApiProperty()  
  @IsEnum(TrainingDuration)
  duration: TrainingDuration;

  @ApiProperty()  
  price: number;

  @ApiProperty()  
  calories: number;

  @ApiProperty()  
  description: string;

  @ApiProperty()  
  @IsEnum(Sex)
  sex: Sex;

  @ApiProperty()  
  video: string;

  @ApiProperty()  
  specialOffer: boolean;
}