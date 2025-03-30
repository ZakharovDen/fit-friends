import { Sex } from "../sex.enum";
import { TrainingDuration } from "../training/training-duration.enum";
import { TrainingLevel } from "../training/training-level.enum";
import { TrainingType } from "../training/training-type.enum";
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
  questionnaire?: Questionnaire;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Questionnaire {
  level: TrainingLevel;
  types: TrainingType[];
  duration: TrainingDuration;
  caloriesTotal: number;
  caloriesByDay: number;
  isReady: boolean;
}