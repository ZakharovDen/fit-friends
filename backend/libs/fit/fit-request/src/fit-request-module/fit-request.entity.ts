import { Entity, Request, RequestStatus, StorableEntity } from '@backend/core';

export class FitRequestEntity extends Entity implements StorableEntity<Request> {
  initiatorId: string;
  userId: string
  createdAt: Date;
  statusDate: Date;
  status: RequestStatus;

  constructor(request?: Request) {
    super();
    this.populate(request);
  }
  populate(request?: Request) {
    if (!request) {
      return;
    }

    this.id = request.id ?? undefined;
    this.initiatorId = request.initiatorId;
    this.userId = request.userId;
    this.createdAt = request.createdAt ?? undefined;
    this.statusDate = request.statusDate ?? undefined;
    this.status = request.status;
  }

  toPOJO(): Request {
    return {
      id: this.id,
      initiatorId: this.initiatorId,
      userId: this.userId,
      createdAt: this.createdAt,
      statusDate: this.statusDate,
      status: this.status,
    }
  }

}