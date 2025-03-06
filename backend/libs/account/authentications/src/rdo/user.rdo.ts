import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AuthFieldDescription } from '../authentication-module/authentication.constant';

export class UserRdo {
  @ApiProperty(AuthFieldDescription.Id)
  @Expose()
  public id: string;

  @ApiProperty(AuthFieldDescription.Email)
  @Expose()
  email: string;

  @ApiProperty(AuthFieldDescription.Name)
  @Expose()
  name: string;

  @ApiProperty(AuthFieldDescription.CreatedAt)
  @Expose()
  public createdAt: Date;

  @ApiProperty(AuthFieldDescription.CountPosts)
  @Expose()
  public countPosts: number;

  @ApiProperty(AuthFieldDescription.CountSubscribers)
  @Expose()
  public countSubscribers: number;
}
