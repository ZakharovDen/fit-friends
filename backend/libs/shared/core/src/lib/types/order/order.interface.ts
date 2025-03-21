import { PaymentMethod } from "./payment-method.enum";

export interface Order {
  id?: string;
  userId: string;
  trainingId: string;
  price: number;
  count: number;
  amount: number;
  paymentMethod: PaymentMethod;
  createdAt?: Date;
  updatedAt?: Date;
}