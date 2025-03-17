import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, Length } from "class-validator";
import { AuthenticationValidateMessage, AuthFieldDescription, AuthValidateValue } from "../authentication-module/authentication.constant";
import 'multer';
import { UserLocation, UserRole, Sex } from "@backend/core";
export class CreateUserDto {
  @ApiProperty(AuthFieldDescription.Email)
  @IsEmail({}, { message: AuthenticationValidateMessage.Email })
  public email: string;

  @ApiProperty(AuthFieldDescription.Name)
  @Length(
    AuthValidateValue.Name.MinLength, 
    AuthValidateValue.Name.MaxLength, 
    { message: AuthenticationValidateMessage.Name }
  )
  @IsString()
  public name: string;

  @ApiProperty(AuthFieldDescription.Password)
  @Length(
    AuthValidateValue.Password.MinLength, 
    AuthValidateValue.Password.MaxLength, 
    { message: AuthenticationValidateMessage.Password }
  )
  @IsString()
  public password: string;

  @ApiProperty(AuthFieldDescription.Avatar)
  @IsOptional()
  public avatar?: string;

  @ApiProperty(AuthFieldDescription.Sex)
  @IsEnum(Sex)
  public sex: Sex;

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
  public description: string;

  @ApiProperty(AuthFieldDescription.Location)
  public location: UserLocation;

  @ApiProperty(AuthFieldDescription.BackgroundImage)
  public backgroundImage: string;

  @ApiProperty(AuthFieldDescription.Role)
  public role: UserRole;

}
