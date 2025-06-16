export enum TrainingSliderDisplayMode {
  Popular,
  UserCardCoach,
}

export const TrainingSliderSettings = {
  [TrainingSliderDisplayMode.Popular]:
  {
    firstDivClass: 'popular-trainings__wrapper',
    secondDivClass: 'popular-trainings__title-wrapper',
    titleClass: 'popular-trainings__title',
    title: 'Популярные тренировки',
    listClass: 'popular-trainings__list',
  },
  [TrainingSliderDisplayMode.UserCardCoach]:
  {
    firstDivClass: 'user-card-coach__training',
    secondDivClass: 'user-card-coach__training-head',
    titleClass: 'user-card-coach__training-title',
    title: 'тренировки',
    listClass: 'user-card-coach__training-list',
  },
} as const;
