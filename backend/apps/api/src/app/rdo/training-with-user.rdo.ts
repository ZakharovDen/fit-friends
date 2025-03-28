import { UserRdo } from "@backend/authentications";
import { FitTrainingRdo } from "@backend/fit-training";
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

export class TrainingWithUserRdo extends OmitType(FitTrainingRdo, ['userId'] as const) {
  @Expose()
  @ApiProperty({ description: 'Тренер', type: [UserRdo] })
  @Type(() => UserRdo)
  user: UserRdo;
};