import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsMongoId, IsUUID, Max, Min } from 'class-validator';
import { PaymentMethod } from "@backend/core";
import { OrderFieldDescription, OrderValidateMessage, OrderValidateValue } from "../fit-order.constant";

export class CreateOrderDto {
  @ApiProperty(OrderFieldDescription.UserId)
  @IsMongoId()
  userId: string;

  @ApiProperty(OrderFieldDescription.TrainingId)
  @IsUUID()
  trainingId: string;

  @ApiProperty(OrderFieldDescription.Price)
  @IsInt()
  price: number;

  @ApiProperty(OrderFieldDescription.Count)
  @IsInt()
  @Min(OrderValidateValue.Count.Min, {message: OrderValidateMessage.Count.ValueMessage})
  @Max(OrderValidateValue.Count.Max, {message: OrderValidateMessage.Count.ValueMessage})
  count: number;

  @ApiProperty(OrderFieldDescription.Amount)
  @IsInt()
  amount: number;

  @ApiProperty(OrderFieldDescription.PaymentMethod)
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}