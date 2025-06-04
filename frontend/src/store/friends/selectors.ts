import { State } from '../../types/state';
import { User } from '../../types/user/user';
import { NameSpace } from '../const';

export const getUsers = (state: State): User[] => state[NameSpace.Friends].users;
export const getUsersLoadingStatus = (state: State) => state[NameSpace.Friends].isLoading;
export const getFriends = (state: State) => state[NameSpace.Friends].friends;