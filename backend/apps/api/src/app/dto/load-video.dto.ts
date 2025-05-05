import { ApiProperty } from "@nestjs/swagger";

export class LoadVideoDto {
    @ApiProperty({ 
      description: 'Training video', 
      type: 'string',
      format: 'binary',
      required: true
    })
    public video: Express.Multer.File;
}
