import { UpdateFitTrainingDto } from "@backend/fit-training";
import { PartialType } from "@nestjs/swagger";

export class UpdateTrainingDto extends PartialType(UpdateFitTrainingDto) {}
