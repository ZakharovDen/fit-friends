import { State } from '../../types/state';
import { FilterValues } from '../../types/training/filter-values';
import { Training } from '../../types/training/training';
import { TrainingsWithPagination } from '../../types/training/trainings-with-pagination';
import { NameSpace } from '../const';

export const getTrainings = (state: State): TrainingsWithPagination => state[NameSpace.Training].trainings;
export const getTrainingsDataLoadingStatus = (state: State): boolean => state[NameSpace.Training].isTrainingsDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Training].hasError;
export const getProductInfo = (state: State): Training | undefined => state[NameSpace.Training].trainingInfo;
export const getFilterValues = (state: State): FilterValues => state[NameSpace.Training].filterValues;