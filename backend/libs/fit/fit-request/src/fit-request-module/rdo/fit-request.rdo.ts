import { RequestStatus } from "@backend/core";
import { Expose } from "class-transformer";

export class FitRequestRdo {
  @Expose()
  id: string;

  @Expose()
  initiatorId: string;

  @Expose()
  userId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  statusDate: Date;

  @Expose()
  status: RequestStatus;
}