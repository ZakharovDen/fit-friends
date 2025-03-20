import { PaymentMethod } from "./payment-method.enum";

export interface Order {
  id?: string;
  trainingId: string;
  price: number;
  count: number;
  amount: number;
  paymentMethod: PaymentMethod;
  createdAt?: Date;
  updatedAt?: Date;
}