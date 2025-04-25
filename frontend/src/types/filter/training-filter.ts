import { TrainingDuration } from "../training/training-duration.enum";
import { TrainingType } from "../training/training-type.enum";
import { TrainingSort } from "./training-sort";

export type TrainingFilter = {
  price: {
    min: number;
    max: number;
  };
  calories: {
    min: number;
    max: number;
  };
  types: TrainingType[];
  durations: TrainingDuration[];
  sort: TrainingSort;
  rating: [number, number];
};