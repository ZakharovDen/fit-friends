import { Sex, UserLocation, UserRole } from "@backend/core";

const users = [
  {
    id: '658170cbb954e9f5b905ccf4',
    email: 'user@local.local',
    name: 'user',
    avatar: '',
    password: 'password123',
    sex: Sex.Male,
    dateOfBirth: new Date('07.09.1989'),
    description: 'Описалово',
    location: UserLocation.Petrogradskaya,
    backgroundImage: 'backend\\uploads\\2025\\03\\11aa6d8d-3ebd-4dda-82ca-6012a5709db7.png',
    role: UserRole.Admin
  },
  {
    id: '6581762309c030b503e30512',
    email: 'user2@local.local',
    name: 'user2',
    avatar: '',
    password: 'passwordqwer',
    sex: Sex.Female,
    dateOfBirth: new Date('01.01.2001'),
    description: 'Описалово qqq',
    location: UserLocation.Pionerskaya,
    backgroundImage: 'backend\\uploads\\2025\\03\\11aa6d8d-3ebd-4dda-82ca-6012a5709db7.png',
    role: UserRole.User
  },
];

export function getUsers() {
  return users;
}