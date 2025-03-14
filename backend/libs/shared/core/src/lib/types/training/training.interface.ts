import { Sex } from "../sex.enum";
import { TrainingDuration } from "./training-duration.enum";
import { TrainingLevel } from "./training-level.enum";
import { TrainingType } from "./training-type.enum";

export interface Training  {
  id?: string;
  userId: string;
  title: string;
  image: string;
  level: TrainingLevel;
  type: TrainingType;
  duration: TrainingDuration;
  price: number;
  calories: number;
  description: string;
  sex: Sex;
  video: string;
  specialOffer: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}