import { AuthorizationStatus } from '../../constant';
import { State } from '../../types/state';
import { User } from '../../types/user/user';
import { NameSpace } from '../const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUser = (state: State): User | undefined => state[NameSpace.User].user;
