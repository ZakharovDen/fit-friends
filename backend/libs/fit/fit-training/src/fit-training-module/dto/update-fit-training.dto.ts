import { PartialType } from "@nestjs/swagger";
import { CreateFitTrainingDto } from "./create-fit-training.dto";

export class UpdateFitTrainingDto extends PartialType(CreateFitTrainingDto) {}