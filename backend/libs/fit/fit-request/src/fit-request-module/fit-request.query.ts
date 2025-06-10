import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";
import { RequestFieldDescription } from "./fit-request.constant";

export class FitRequestQuery {
  @ApiProperty(RequestFieldDescription.InitiatorId)
  @IsMongoId()
  initiatorId: string;

  @ApiProperty(RequestFieldDescription.UserId)
  @IsMongoId()
  userId: string;
}