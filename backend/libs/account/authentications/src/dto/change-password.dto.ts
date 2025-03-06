import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsString, Length } from "class-validator";
import { AuthenticationValidateMessage, AuthFieldDescription, AuthValidateValue } from "../authentication-module/authentication.constant";

export class ChangePasswordDto {
  @ApiProperty(AuthFieldDescription.Id)
  @IsMongoId()
  public userId: string;

  @ApiProperty(AuthFieldDescription.CurrentPassword)
  @Length(
    AuthValidateValue.Password.MinLength, 
    AuthValidateValue.Password.MaxLength, 
    { message: AuthenticationValidateMessage.Password }
  )
  @IsString()
  public currentPassword: string;

  @ApiProperty(AuthFieldDescription.NewPassword)
  @Length(
    AuthValidateValue.Password.MinLength, 
    AuthValidateValue.Password.MaxLength, 
    { message: AuthenticationValidateMessage.Password }
  )
  @IsString()
  public newPassword: string;
}