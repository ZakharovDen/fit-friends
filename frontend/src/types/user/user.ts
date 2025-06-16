import { Sex } from '../sex.enum';
import { TrainingDuration } from '../training/training-duration.enum';
import { TrainingLevel } from '../training/training-level.enum';
import { TrainingType } from '../training/training-type.enum';
import { UserLocation } from './user-location.enum';
import { UserRole } from './user-role.enum';

export type Questionnaire = {
  level: TrainingLevel;
  types: TrainingType[];
  duration: TrainingDuration;
  caloriesTotal: number;
  caloriesByDay: number;
  isReady: boolean;
}

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
  questionnaire?: Questionnaire;
  friends?: string[];
};

export type LoggedUser = User & {
  accessToken: string;
  refreshToken: string;
}

export type UserAuth = Pick<User, 'email'> & { password: string };

export type UserRegister = User & { password: string };

export type UserUpdate = Omit<User, 'id' | 'email' | 'dateOfBirth' | 'role' | 'createdAt' | 'backgroundImage'>;
