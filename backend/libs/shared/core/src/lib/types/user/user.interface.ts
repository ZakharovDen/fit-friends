import { Sex } from "../sex.enum";
import { UserLocation } from "./user-location.enum";
import { UserRole } from "./user-role.enum";

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  sex: Sex;
  dateOfBirth?: Date;
  description?: string;
  location: UserLocation;
  backgroundImage?: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
