import { PaymentMethod } from "@backend/core";

export const OrderValidateValue = {
  Count: {
    Min: 1,
    Max: 50,
  },
} as const;

export const OrderValidateMessage = {
  Count: {
    ValueMessage: `min value for Count is ${OrderValidateValue.Count.Min}, max is  ${OrderValidateValue.Count.Max}`,
  },
} as const;

export const OrderFieldDescription = {
  Id: { description: 'Уникальный идентификатор отзыва', example: 'dd4319c5-5454-420c-8025-b4af417d7f47' },
  UserId: { description: 'Идентификатор создателя тренировки (тренера)', example: '6766e16f90c0264a74a1f9d4' },
  TrainingId: { description: 'Идентификатор тренировки', example: '0dfbda7e-fb14-4ca3-ae1d-8e111a777a66' },
  Price: { description: 'Цена тренировки', example: 2000 },
  Count: { description: 'Количество', example: 2 },
  Amount: { description: 'Сумма заказа', example: 4000 },
  PaymentMethod: { description: 'Способ оплаты', example: PaymentMethod.mir },
  CreatedAt: { description: 'Дата создания отзыва', example: new Date() },
} as const ;
