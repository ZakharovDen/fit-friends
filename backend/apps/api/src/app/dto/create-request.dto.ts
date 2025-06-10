import { CreateFitRequestDto } from "@backend/fit-request";
import { OmitType } from "@nestjs/swagger";

export class CreateRequestDto extends OmitType(CreateFitRequestDto, ['initiatorId']){};