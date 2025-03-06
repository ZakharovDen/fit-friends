import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AuthFieldDescription } from '../authentication-module/authentication.constant';

export class LoggedUserRdo {
  @ApiProperty(AuthFieldDescription.Id)
  @Expose()
  public id: string;

  @ApiProperty(AuthFieldDescription.Email)
  @Expose()
  public email: string;

  @ApiProperty(AuthFieldDescription.AccessToken)
  @Expose()
  public accessToken: string;

  @ApiProperty(AuthFieldDescription.RefreshToken)
  @Expose()
  public refreshToken: string;
}
