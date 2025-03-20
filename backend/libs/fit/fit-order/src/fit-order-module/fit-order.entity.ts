import { Entity, Order, PaymentMethod, StorableEntity } from '@backend/core';

export class FitOrderEntity extends Entity implements StorableEntity<Order> {
  trainingId: string;
  price: number;
  count: number;
  amount: number;
  paymentMethod: PaymentMethod;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(order?: Order) {
    super();
    this.populate(order);
  }
  populate(order?: Order) {
    if (!order) {
      return;
    }

    this.id = order.id ?? undefined;
    this.trainingId = order.trainingId;
    this.price = order.price;
    this.count = order.count;
    this.amount = order.amount;
    this.paymentMethod = order.paymentMethod;
    this.createdAt = order.createdAt ?? undefined;
    this.updatedAt = order.updatedAt ?? undefined;
  }

  toPOJO(): Order {
    return {
      id: this.id,
      trainingId: this.trainingId,
      price: this.price,
      count: this.count,
      amount: this.amount,
      paymentMethod: this.paymentMethod,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

}