export enum TrainingSort {
  Lower = 'lower',
  Higher = 'higher',
  Free = 'free',
}

export const TrainingSortLabel: Record<TrainingSort, string> = {
  [TrainingSort.Lower]: 'Дешевле',
  [TrainingSort.Higher]: 'Дороже',
  [TrainingSort.Free]: 'Бесплатные',
};
