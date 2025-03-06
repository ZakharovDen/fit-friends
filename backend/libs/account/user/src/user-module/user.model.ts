import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser, UserLocation, UserRole, UserSex } from "@backend/core";

@Schema({
  collection: 'accounts',
  timestamps: true,
})
export class UserModel extends Document implements AuthUser {
  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public passwordHash: string;

  @Prop({ required: false })
  public avatar?: string;

  @Prop({ required: true })
  sex: UserSex;

  @Prop({ required: false })
  dateOfBirth?: Date;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: true })
  location: UserLocation;

  @Prop({ required: true })
  backgroundImage: string;

  @Prop({ required: true })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
