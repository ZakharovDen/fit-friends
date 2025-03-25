import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthUser, UserLocation, UserRole, Sex } from "@backend/core";

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

  @Prop({ 
    required: true, 
    type: String,
    enum: Sex, 
  })
  sex: Sex;

  @Prop({ required: false })
  dateOfBirth?: Date;

  @Prop({ required: false })
  description?: string;

  @Prop({ 
    required: true, 
    type: String,
    enum: UserLocation, 
  })
  location: UserLocation;

  @Prop({ required: false, type: String })
  backgroundImage?: string;

  @Prop({ 
    required: true, 
    type: String,
    enum: UserRole, 
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
