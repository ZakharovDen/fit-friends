export enum TrainingItemDisplayMode {
  Catalog,
  Popular,
  Purchase,
  UserCardCoach,
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
  [TrainingItemDisplayMode.UserCardCoach]:
  {
    itemClass: 'user-card-coach__training-item',
  },
} as const;
