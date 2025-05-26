import { State } from '../../types/state';
import { User } from '../../types/user/user';
import { NameSpace } from '../const';

export const getUsers = (state: State): User[] => state[NameSpace.Friends].users;
