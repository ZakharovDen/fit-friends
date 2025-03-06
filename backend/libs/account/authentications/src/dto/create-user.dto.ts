import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";
import { AuthenticationValidateMessage, AuthFieldDescription, AuthValidateValue } from "../authentication-module/authentication.constant";
import 'multer';
import { UserLocation, UserRole, UserSex } from "@backend/core";
export class CreateUserDto {
  @ApiProperty(AuthFieldDescription.Email)
  @IsEmail({}, { message: AuthenticationValidateMessage.Email })
  public email: string;

  @ApiProperty(AuthFieldDescription.Name)
  @Length(
    AuthValidateValue.Name.MinLength, 
    AuthValidateValue.Name.MaxLength, 
    { message: AuthenticationValidateMessage.Password }
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

  public sex: UserSex;
  public dateOfBirth?: Date;
  public description?: string;
  public location: UserLocation;
  public backgroundImage: string;
  public role: UserRole;

}
