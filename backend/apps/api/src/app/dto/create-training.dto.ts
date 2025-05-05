import { CreateFitTrainingDto } from "@backend/fit-training";
import { ApiProperty, OmitType } from "@nestjs/swagger";

export class CreateTrainingDto extends OmitType(CreateFitTrainingDto, ['userId', 'video'] as const) {
    @ApiProperty({ 
      description: 'Training video', 
      type: 'string',
      format: 'binary',
      required: true
    })
    public video: Express.Multer.File;
}
