import { TrainingLevel, TrainingType, UserLocation, UserRole } from "@backend/core";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsIn, IsOptional } from "class-validator";

export class UserQuery {
  @ApiProperty({ description: 'Локация', required: false, enum: UserLocation })
  @IsIn(Object.values(UserLocation), { each: true })
  @IsOptional()
  public locations?: UserLocation[];

  @ApiProperty({ description: 'Специализация', required: false, enum: TrainingType })
  @IsIn(Object.values(TrainingType), { each: true })
  @IsOptional()
  public specializations?: TrainingType[];

  @ApiProperty({ description: 'Уровень', required: false, enum: TrainingLevel })
  @IsEnum(TrainingLevel)
  @IsOptional()
  public level?: TrainingLevel;

  @ApiProperty({ description: 'Роль', required: false, enum: UserRole })
  @IsEnum(UserRole)
  @IsOptional()
  public role?: UserRole;
}