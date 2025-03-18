export const DEFAULT_COUNT_BY_PAGE_LIMIT = 5;
export const DEFAULT_PAGE_COUNT = 1;

import { Sex, TrainingDuration, TrainingLevel, TrainingType } from "@backend/core";

export const TrainingValidateValue = {
  Title: {
    MinLength: 1,
    MaxLength: 15,
  },
  Description: {
    MinLength: 10,
    MaxLength: 140,
  },
  Price: {
    Min: 0,
  },
  Calories: {
    Min: 1000,
    Max: 5000,
  },
} as const;

export const TrainingValidateMessage = {
  Title: {
    LengthMessage: `min length for title is ${TrainingValidateValue.Title.MinLength}, max is ${TrainingValidateValue.Title.MaxLength}`,
  },
  Description: {
    LengthMessage: `min length for Description is ${TrainingValidateValue.Description.MinLength}, max is ${TrainingValidateValue.Description.MaxLength}`,
  },
  Price: {
    ValueMessage: `min value for Price is ${TrainingValidateValue.Price.Min}`,
  },
  Calories: {
    ValueMessage: `min value for Calories is ${TrainingValidateValue.Calories.Min}, max is  ${TrainingValidateValue.Calories.Max}`,
  },
} as const;

export const TrainingFieldDescription = {
  Id: { description: 'Уникальный идентификатор тренировки', example: 'dd4319c5-5454-420c-8025-b4af417d7f47' },
  UserId: { description: 'Идентификатор создателя тренировки (тренера)', example: '6766e16f90c0264a74a1f9d4' },
  Title: { description: 'Название тренировки', example: 'Моя тренировка' },
  Image: { description: 'Фоновое изображение', example: 'upload/image-example.jpg' },
  Level: { description: 'Уровень', example: TrainingLevel.Beginner },
  Type: { description: 'Тип тренировки', example: TrainingType.Aerobics },
  Duration: { description: 'Длительность тренировки', example: TrainingDuration["10-30"] },
  Price: { description: 'Цена', example: 1000 },
  Calories: { description: 'Количество калорий', example: 2500 },
  Description: { description: 'Описание', example: 'Описание тренировки' },
  Sex: { description: 'Пол', example: Sex.Any },
  Video: { description: 'Видео тренировки', example: 'upload/video-example.mp4' },
  SpecialOffer: { description: 'Признак специального предложения', example: false },
  Rating: { description: 'Рейтинг тренировки', example: 5 },
} as const ;
