export enum TrainingItemDisplayMode {
  Catalog,
  Popular,
}

export const TrainingItemSettings = {
  [TrainingItemDisplayMode.Catalog]:
  {
    itemClass: 'training-catalog__item',
  },
  [TrainingItemDisplayMode.Popular]:
  {
    itemClass: 'popular-trainings__item',
  },
} as const;