import { State } from '../../types/state';
import { AllowedFilterValues } from '../../types/filter/allowed-filter-values';
import { TrainingWithUser } from '../../types/training/training';
import { TrainingsWithPagination } from '../../types/training/trainings-with-pagination';
import { NameSpace } from '../const';

export const getTrainings = (state: State): TrainingsWithPagination => state[NameSpace.Training].trainings;
export const getTrainingsDataLoadingStatus = (state: State): boolean => state[NameSpace.Training].isTrainingsDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Training].hasError;
export const getTrainingInfo = (state: State): TrainingWithUser | undefined => state[NameSpace.Training].trainingInfo;
export const getAllowedFilterValues = (state: State): AllowedFilterValues => state[NameSpace.Training].filterValues;