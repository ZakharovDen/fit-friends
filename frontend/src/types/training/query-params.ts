import { TrainingType } from "./training-type.enum";

export interface QueryParams {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
  minPrice?: number;
  maxPrice?: number;
  minCalories?: number;
  maxCalories?: number;
  minRating?: number;
  maxRating?: number;
  trainingType?: TrainingType[];
  isFree?: boolean;
}