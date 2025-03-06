import mongoose, * as Mongoose from 'mongoose';
import { genSalt, hash } from 'bcrypt';

import { AuthUser } from '@project/core';
import { BlogUserSchema } from './user.model';
import { getMongoConnectionString } from 'c:/projects/2486641-readme-8/project/libs/shared/helpers/src/lib/common';
import { SALT_ROUNDS } from './user.constant';

const MOCK_USERS = [
  {
    id: '658170cbb954e9f5b905ccf4',
    email: 'user@local.local',
    name: 'user',
    avatar: '',
    password: 'password123'
  },
  {
    id: '6581762309c030b503e30512',
    email: 'user2@local.local',
    name: 'user2',
    avatar: '',
    password: 'passwordqwer'
  },
] as const;

const UserEntity =
  (mongoose.models.User as Mongoose.Model<AuthUser>) ||
  mongoose.model<AuthUser>('accounts', BlogUserSchema);

async function bootstrap() {
  const mongoDbUrl = getMongoConnectionString(
    {
      authDatabase: process.env.MONGO_AUTH_BASE,
      databaseName: process.env.MONGO_DB,
      host: process.env.MONGO_HOST,
      password: process.env.MONGO_PASSWORD,
      port: process.env.MONGO_PORT,
      username: process.env.MONGO_USER
    }
  );
  console.log(mongoDbUrl);

  const mongoose = await Mongoose.connect(mongoDbUrl);
  const salt = await genSalt(SALT_ROUNDS);

  for (const mockUser of MOCK_USERS) {
    const { id: _id, email, name, password, avatar } = mockUser;
    const passwordHash = await hash(password, salt);
    await new UserEntity({ _id, email, name, avatar, passwordHash }).save();
  }

  await mongoose.disconnect?.();
  console.info('🤘️ Database was filled');
}

bootstrap();