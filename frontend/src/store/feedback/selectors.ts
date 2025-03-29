import { FeedbackWithUser } from "../../types/feedback/feedback";
import { State } from "../../types/state";
import { NameSpace } from "../const";

export const getFeedbacks = (state: State): FeedbackWithUser[] | [] => state[NameSpace.Feedback].feedbacks;
