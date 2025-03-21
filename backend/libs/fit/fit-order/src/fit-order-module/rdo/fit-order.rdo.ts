import { ApiProperty } from "@nestjs/swagger";
import { OrderFieldDescription } from "../fit-order.constant";
import { Expose } from "class-transformer";
import { PaymentMethod } from "@backend/core";

export class FitOrderRdo {
  @ApiProperty(OrderFieldDescription.Id)
  @Expose()
  id: string;

  @ApiProperty(OrderFieldDescription.UserId)
  userId: string;

  @ApiProperty(OrderFieldDescription.TrainingId)
  @Expose()
  trainingId: string;

  @ApiProperty(OrderFieldDescription.Price)
  @Expose()
  price: number;

  @ApiProperty(OrderFieldDescription.Count)
  @Expose()
  count: number;

  @ApiProperty(OrderFieldDescription.Amount)
  @Expose()
  amount: number;

  @ApiProperty(OrderFieldDescription.PaymentMethod)
  @Expose()
  paymentMethod: PaymentMethod;

  @ApiProperty(OrderFieldDescription.CreatedAt)
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}