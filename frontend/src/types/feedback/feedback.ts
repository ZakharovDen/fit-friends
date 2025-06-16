import { User } from '../user/user';

export type Feedback = {
  id: string;
  userId: string;
  trainingId: string;
  rating: number;
  text: string;
  createdAt: Date;
}

export type FeedbackWithUser = Omit<Feedback, 'userId'> & {user: User};

export type FeedbackData = Omit<Feedback, 'id' | 'userId' | 'createdAt'>;
