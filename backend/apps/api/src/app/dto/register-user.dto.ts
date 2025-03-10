import { ApiProperty, OmitType } from "@nestjs/swagger";
import { CreateUserDto } from "@backend/authentications";
import { IsOptional } from "class-validator";

export class RegisterUserDto extends OmitType(CreateUserDto, ['avatar'] as const) {
  
  @ApiProperty({ 
    description: 'User avatar', 
    type: 'string',
    format: 'binary',
    required: false
  })
  @IsOptional()
  public avatar?: Express.Multer.File;
}