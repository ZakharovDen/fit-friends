export interface Feedback {
  id?: string;
  userId: string;
  trainingId: string;
  rating: number;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}