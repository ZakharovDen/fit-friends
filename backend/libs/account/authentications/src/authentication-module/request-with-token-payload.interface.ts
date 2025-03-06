import { TokenPayload } from '@backend/core';

export interface RequestWithTokenPayload {
  user?: TokenPayload
}