import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId } from 'class-validator';
import { RequestStatus } from "@backend/core";
import { RequestFieldDescription } from "../fit-request.constant";

export class CreateRequestDto {
  @ApiProperty(RequestFieldDescription.InitiatorId)
  @IsMongoId()
  initiatorId: string;

  @ApiProperty(RequestFieldDescription.UserId)
  @IsMongoId()
  userId: string;

  // @ApiProperty(RequestFieldDescription.Status)
  // @IsEnum(RequestStatus)
  // status: RequestStatus;
}