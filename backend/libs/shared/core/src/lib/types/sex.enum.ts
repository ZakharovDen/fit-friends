export enum Sex {
  Male = 'male',
  Female = 'female',
  Any = 'any'
}

export const SexTrainingLabel: Record<Sex, string> = {
  [Sex.Male]: 'для мужчин',
  [Sex.Female]: 'для женщин',
  [Sex.Any]: 'для всех',
};

export const SexUserLabel: Record<Sex, string> = {
  [Sex.Male]: 'мужской',
  [Sex.Female]: 'женский',
  [Sex.Any]: 'неважно',
};