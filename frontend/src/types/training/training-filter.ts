import { TrainingType } from "./training-type.enum";

export type TrainingFilter = {
  price: {
    min: number;
    max: number;
  },
  calories: {
    min: number;
    max: number;
  },
  types: TrainingType[],
};