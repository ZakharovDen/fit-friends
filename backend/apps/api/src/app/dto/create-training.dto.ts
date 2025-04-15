import { CreateFitTrainingDto } from "@backend/fit-training";
import { OmitType } from "@nestjs/swagger";

export class CreateTrainingDto extends OmitType(CreateFitTrainingDto, ['userId', 'image'] as const) {}
