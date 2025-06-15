import { User } from "../user/user";
import { RequestStatus } from "./request-status.enum";

export type Request = {
  id?: string;
  initiatorId: string;
  userId: string
  createdAt?: Date;
  statusDate?: Date;
  status: RequestStatus;
};

export type TrainingRequest = {
  incoming: Request;
  outgoing: Request;
};

export type Friend = Omit<User, 'friends'> & {request: TrainingRequest};
