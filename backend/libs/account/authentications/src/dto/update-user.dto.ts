import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsOptional, IsString, Length, ValidateNested } from "class-validator";
import { AuthenticationValidateMessage, AuthFieldDescription, AuthValidateValue } from "../authentication-module/authentication.constant";
import 'multer';
import { UserLocation, UserRole, Sex } from "@backend/core";
import { CreateQuestionnaireDto } from "./create-user-questionnaire.dto";
import { Type } from "class-transformer";
export class UpdateUserDto {
  @ApiProperty(AuthFieldDescription.Name)
  @Length(
    AuthValidateValue.Name.MinLength, 
    AuthValidateValue.Name.MaxLength, 
    { message: AuthenticationValidateMessage.Name }
  )
  @IsString()
  @IsOptional()
  public name?: string;

  @ApiProperty(AuthFieldDescription.Avatar)
  @IsOptional()
  public avatar?: string;

  @ApiProperty(AuthFieldDescription.Sex)
  @IsEnum(Sex)
  @IsOptional()
  public sex?: Sex;

  @ApiProperty(AuthFieldDescription.DateOfBirth)
  @IsDateString()
  @IsOptional()
  public dateOfBirth?: Date;

  @ApiProperty(AuthFieldDescription.Description)
  @Length(
    AuthValidateValue.Description.MinLength, 
    AuthValidateValue.Description.MaxLength, 
    { message: AuthenticationValidateMessage.Description }
  )
  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty(AuthFieldDescription.Location)
  @IsOptional()
  public location?: UserLocation;

  @ApiProperty(AuthFieldDescription.BackgroundImage)
  @IsOptional()
  public backgroundImage?: string;

  @ApiProperty(AuthFieldDescription.Role)
  @IsOptional()
  public role?: UserRole;

  @ApiProperty({description: 'Опросник', type: CreateQuestionnaireDto})
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateQuestionnaireDto)
  public questionnaire: CreateQuestionnaireDto;
}
