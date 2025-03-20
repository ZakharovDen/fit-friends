export const FeedbackValidateValue = {
  Rating: {
    Min: 1,
    Max: 5,
  },
  Text: {
    MinLength: 100,
    MaxLength: 1024,
  },
} as const;

export const FeedbackValidateMessage = {
  Text: {
    LengthMessage: `min length for Text is ${FeedbackValidateValue.Text.MinLength}, max is ${FeedbackValidateValue.Text.MaxLength}`,
  },
  Rating: {
    ValueMessage: `min value for Rating is ${FeedbackValidateValue.Rating.Min}, max is  ${FeedbackValidateValue.Rating.Max}`,
  },
} as const;

export const FeedbackFieldDescription = {
  Id: { description: 'Уникальный идентификатор отзыва', example: 'dd4319c5-5454-420c-8025-b4af417d7f47' },
  UserId: { description: 'Идентификатор автора отзыва', example: '6766e16f90c0264a74a1f9d4' },
  TrainingId: { description: 'Идентификатор тренировки', example: '0dfbda7e-fb14-4ca3-ae1d-8e111a777a66' },
  Rating: { description: 'Оценка', example: 5 },
  Text: { description: 'Текст отзыва', example: 'Эта тренировка для меня зарядка по утрам, помогает проснуться.' },
  CreatedAt: { description: 'Дата создания отзыва', example: new Date() },
} as const ;
