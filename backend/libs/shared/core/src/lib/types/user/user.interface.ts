import { UserLocation } from "./user-location.enum";
import { UserRole } from "./user-role.enum";
import { UserSex } from "../sex.enum";

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  sex: UserSex;
  dateOfBirth?: Date;
  description?: string;
  location: UserLocation;
  backgroundImage: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
