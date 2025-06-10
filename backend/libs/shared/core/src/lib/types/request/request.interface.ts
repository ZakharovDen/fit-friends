import { RequestStatus } from "./request-status.enum";

export interface Request {
  id?: string;
  initiatorId: string;
  userId: string
  createdAt?: Date;
  statusDate?: Date;
  status: RequestStatus;
}