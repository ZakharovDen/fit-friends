import { UserRdo } from "@backend/authentications";
import { FitFeedBackRdo } from "@backend/fit-feedback";
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

export class FeedbackWithUserRdo extends OmitType(FitFeedBackRdo, ['userId'] as const) {
  @Expose()
  @ApiProperty({ description: 'Автор', type: [UserRdo] })
  @Type(() => UserRdo)
  user: UserRdo;
};