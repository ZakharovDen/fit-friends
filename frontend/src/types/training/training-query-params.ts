import { TrainingDuration } from "./training-duration.enum";
import { TrainingType } from "./training-type.enum";

export interface TrainingQueryParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  minCalories?: number;
  maxCalories?: number;
  minRating?: number;
  maxRating?: number;
  trainingType?: TrainingType[];
  trainingDuration?: TrainingDuration[];
  isFree?: boolean;
  userId?: string;
}