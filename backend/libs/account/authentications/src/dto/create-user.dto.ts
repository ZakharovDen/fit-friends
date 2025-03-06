import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";
import { AuthenticationValidateMessage, AuthFieldDescription, AuthValidateValue } from "../authentication-module/authentication.constant";
import 'multer';
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
}
