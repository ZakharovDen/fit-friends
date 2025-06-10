import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from 'class-validator';
import { RequestFieldDescription } from "../fit-request.constant";
import { RequestStatus } from "@backend/core";

export class UpdateFitRequestDto {
  @ApiProperty(RequestFieldDescription.Status)
  @IsEnum(RequestStatus)
  status: RequestStatus;
}