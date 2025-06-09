import { RequestStatus } from "@backend/core";

export const RequestFieldDescription = {
  Id: { description: 'Уникальный идентификатор заявки', example: 'dd4319c5-5454-420c-8025-b4af417d7f47' },
  InitiatorId: { description: 'Инициатор тренировки', example: '6766e16f90c0264a74a1f9d4' },
  UserId: { description: 'Тренер или другой пользователь, с кем проводится тренировка', example: '6766e16f90c0264a74a1f9d4' },
  CreatedAt: { description: 'Дата создания заявки', example: new Date() },
  Status: { description: 'Статус заявки', example: RequestStatus.accepted },
} as const ;
