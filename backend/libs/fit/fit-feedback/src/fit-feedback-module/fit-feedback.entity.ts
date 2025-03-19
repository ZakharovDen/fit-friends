import { Entity, Feedback, StorableEntity } from '@backend/core';

export class FitFeedbackEntity extends Entity implements StorableEntity<Feedback> {
  public userId: string;
  public trainingId: string;
  public rating: number;
  public text: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(feedback?: Feedback) {
    super();
    this.populate(feedback);
  }
  populate(feedback?: Feedback) {
    if (!feedback) {
      return;
    }

    this.id = feedback.id ?? undefined;
    this.userId = feedback.userId;
    this.trainingId = feedback.trainingId;
    this.rating = feedback.rating;
    this.text = feedback.text;
    this.createdAt = feedback.createdAt ?? undefined;
    this.updatedAt = feedback.updatedAt ?? undefined;
  }

  toPOJO(): Feedback {
    return {
      id: this.id,
      userId: this.userId,
      trainingId: this.trainingId,
      rating: this.rating,
      text: this.text,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

}