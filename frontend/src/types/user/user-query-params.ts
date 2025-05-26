import { TrainingLevel } from "../training/training-level.enum";
import { TrainingType } from "../training/training-type.enum";
import { UserLocation } from "./user-location.enum";
import { UserRole } from "./user-role.enum";

export interface UserQueryParams {
  locations?: UserLocation[];
  specializations?: TrainingType[];
  level?: TrainingLevel;
  role?: UserRole;
}