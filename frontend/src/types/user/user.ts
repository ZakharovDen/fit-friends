import { Sex } from "../sex.enum";
import { UserLocation } from "./user-location.enum";
import { UserRole } from "./user-role.enum";

type User = {
  name: string;
  email: string;
  avatar?: string;
  sex: Sex;
  dateOfBirth?: Date;
  description?: string;
  location: UserLocation;
  backgroundImage: string;
  role: UserRole;
}

export type UserData = User & {
  accessToken: string;
};

export type UserAuth = Pick<User, 'email'> & { password: string };

export type UserRegister =  User &  { password: string };