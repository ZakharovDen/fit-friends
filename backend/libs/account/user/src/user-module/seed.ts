import mongoose, * as Mongoose from 'mongoose';
import { genSalt, hash } from 'bcrypt';

import { AuthUser } from '@backend/core';
import { UserSchema } from './user.model';
import { getMongoConnectionString, getUsers } from '@backend/helpers';
import { SALT_ROUNDS } from './user.constant';

const UserEntity =
  (mongoose.models.User as Mongoose.Model<AuthUser>) ||
  mongoose.model<AuthUser>('accounts', UserSchema);

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

  const mongoose = await Mongoose.connect(mongoDbUrl);
  const salt = await genSalt(SALT_ROUNDS);
  const mockUsers = getUsers();

  for (const mockUser of mockUsers) {
    const { id: _id, email, name, password, avatar, backgroundImage, dateOfBirth, description, location, role, sex, questionnaire } = mockUser;
    const passwordHash = await hash(password, salt);
    await new UserEntity({ 
      _id, 
      email, 
      name, 
      avatar, 
      passwordHash, 
      backgroundImage, 
      dateOfBirth, 
      description, 
      location, 
      role, 
      sex, 
      questionnaire
    }).save();
  }

  await mongoose.disconnect?.();
  console.info('🤘️ Database was filled');
}

bootstrap();