import { Sex } from "../sex.enum";
import { UserLocation } from "./user-location.enum";
import { UserRole } from "./user-role.enum";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  sex: Sex;
  dateOfBirth?: Date;
  description?: string;
  location: UserLocation;
  backgroundImage: string;
  role: UserRole;
  createdAt?: Date;
};

export type LoggedUser = User & {
  accessToken: string;
  refreshToken: string;
}

export type UserAuth = Pick<User, 'email'> & { password: string };

export type UserRegister =  User &  { password: string };