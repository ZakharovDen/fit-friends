import { Sex } from "../sex.enum";
import { User } from "../user/user";
import { TrainingDuration } from "./training-duration.enum";
import { TrainingLevel } from "./training-level.enum";
import { TrainingType } from "./training-type.enum";

export type Training = {
  id: string;
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
  rating: number;
  createdAt: Date;
}

export type TrainingWithUser = Omit<Training, 'userId'> & {user: User};

export type TrainingCrateData = Omit<Partial<Training>, 'userId' | 'id' | 'image' | 'specialOffer' | 'rating' | 'createdAt'>;

export type TrainingUpdateData = Pick<Partial<Training>, 'title' | 'description' | 'price'>;