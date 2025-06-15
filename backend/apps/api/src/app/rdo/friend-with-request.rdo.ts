import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserLocation, UserRole, Sex, Request } from '@backend/core';
import { AuthFieldDescription, QuestionnaireRdo } from '@backend/authentications';

interface TrainingRequest {
  incoming?: Request;
  outgoing?: Request;
}

export class FriendWithRequestRdo {
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
  sex: Sex;

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

  @Expose()
  @ApiProperty({type: QuestionnaireRdo})
  @Type(() => QuestionnaireRdo)
  questionnaire?: QuestionnaireRdo;

  @Expose()
  @ApiProperty()
  request?: TrainingRequest
}
