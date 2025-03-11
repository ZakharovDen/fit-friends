import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AuthFieldDescription } from '../authentication-module/authentication.constant';
import { UserLocation, UserRole, UserSex } from '@backend/core';

export class LoggedUserRdo {
  @ApiProperty(AuthFieldDescription.Id)
  @Expose()
  public id: string;

  @ApiProperty(AuthFieldDescription.Email)
  @Expose()
  public email: string;

  @ApiProperty(AuthFieldDescription.Name)
  @Expose()
  name: string;

  @ApiProperty(AuthFieldDescription.Avatar)
  @Expose()
  avatar?: string;

  @ApiProperty(AuthFieldDescription.Sex)
  @Expose()
  sex: UserSex;

  @ApiProperty(AuthFieldDescription.DateOfBirth)
  @Expose()
  dateOfBirth?: Date;

  @ApiProperty(AuthFieldDescription.Description)
  @Expose()
  description?: string;

  @ApiProperty(AuthFieldDescription.Location)
  @Expose()
  location: UserLocation;

  @ApiProperty(AuthFieldDescription.BackgroundImage)
  @Expose()
  backgroundImage: string;

  @ApiProperty(AuthFieldDescription.Role)
  @Expose()
  role: UserRole;

  @ApiProperty(AuthFieldDescription.CreatedAt)
  @Expose()
  createdAt?: Date;

  @ApiProperty(AuthFieldDescription.AccessToken)
  @Expose()
  public accessToken: string;

  @ApiProperty(AuthFieldDescription.RefreshToken)
  @Expose()
  public refreshToken: string;
}
