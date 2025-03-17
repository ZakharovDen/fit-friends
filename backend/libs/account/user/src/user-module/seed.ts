import mongoose, * as Mongoose from 'mongoose';
import { genSalt, hash } from 'bcrypt';

import { AuthUser, Sex, UserLocation, UserRole } from '@backend/core';
import { UserSchema } from './user.model';
import { getMongoConnectionString } from '@backend/helpers';
import { SALT_ROUNDS } from './user.constant';

const MOCK_USERS = [
  {
    id: '658170cbb954e9f5b905ccf4',
    email: 'user@local.local',
    name: 'user',
    avatar: '',
    password: 'password123',
    sex: 'Male',
    dateOfBirth: new Date('07.09.1989'),
    description: 'Описалово',
    location: 'Петроградская',
    backgroundImage: 'backend\\uploads\\2025\\03\\11aa6d8d-3ebd-4dda-82ca-6012a5709db7.png',
    role: 'admin'
  },
  // {
  //   id: '6581762309c030b503e30512',
  //   email: 'user2@local.local',
  //   name: 'user2',
  //   avatar: '',
  //   password: 'passwordqwer',
  //   sex: Sex.Female,
  //   dateOfBirth: new Date('01.01.2001'),
  //   description: 'Описалово qqq',
  //   location: UserLocation.Pionerskaya,
  //   backgroundImage: 'backend\\uploads\\2025\\03\\11aa6d8d-3ebd-4dda-82ca-6012a5709db7.png',
  //   role: UserRole.User
  // },
] as const;

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
  console.log(mongoDbUrl);

  const mongoose = await Mongoose.connect(mongoDbUrl);
  const salt = await genSalt(SALT_ROUNDS);

  for (const mockUser of MOCK_USERS) {
    const { id: _id, email, name, password, avatar, backgroundImage, dateOfBirth, description, location, role, sex } = mockUser;
    const passwordHash = await hash(password, salt);
    await new UserEntity({ _id, email, name, avatar, passwordHash, backgroundImage, dateOfBirth, description, location, role, sex }).save();
  }

  await mongoose.disconnect?.();
  console.info('🤘️ Database was filled');
}

bootstrap();