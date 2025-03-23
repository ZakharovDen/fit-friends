export enum TrainingItemDisplayMode {
  Catalog,
  Popular,
  Purchase,
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
  [TrainingItemDisplayMode.Purchase]:
  {
    itemClass: 'my-purchases__item',
  },
} as const;