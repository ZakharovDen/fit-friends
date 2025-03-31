import { AuthorizationStatus } from '../../constant';
import { State } from '../../types/state';
import { User } from '../../types/user/user';
import { NameSpace } from '../const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUser = (state: State): User | undefined => state[NameSpace.User].user;
export const getIsProcess = (state: State): boolean => state[NameSpace.User].isProcess;
export const getIsSuccess = (state: State): boolean => state[NameSpace.User].isSuccess;
export const getIsQuestionnaireCompleted = (state: State): boolean => state[NameSpace.User].isQuestionnaireCompleted;