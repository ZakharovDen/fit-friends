import { UserLocation, UserRole, Sex } from "@backend/core";

export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';

export const AuthenticationResponseMessage = {
  LoggedSuccess: 'User has been successfully logged.',
  LoggedError: 'Password or Login is wrong.',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created.',
} as const;

export const AuthValidateValue = {
  Password: {
    MinLength: 6,
    MaxLength: 12,
  },
  Name: {
    MinLength: 1,
    MaxLength: 15,
  },
  Description: {
    MinLength: 10,
    MaxLength: 140,
  },
} as const;

export const AuthenticationValidateMessage = {
  Email: 'The email is not valid',
  Password: `Min length for password is ${AuthValidateValue.Password.MinLength}, max is ${AuthValidateValue.Password.MaxLength}`,
  Name: `Min length for name is ${AuthValidateValue.Name.MinLength}, max is ${AuthValidateValue.Name.MaxLength}`,
  Description: `Min length for Description is ${AuthValidateValue.Description.MinLength}, max is ${AuthValidateValue.Description.MaxLength}`,
  
} as const;

export const AuthFieldDescription = {
  Id: { description: 'Уникальный идентификатор пользователя', example: 'dd4319c5-5454-420c-8025-b4af417d7f47' },
  Name: { description: 'Имя пользователя', example: 'Ivanov Ivan' },
  Email: { description: 'Электронная почта пользователя', example: 'example@email.com' },
  CreatedAt: { description: 'Дата регистрации', example: new Date() },
  CountPosts: { description: 'Количество публикаций пользователя', example: 77 },
  CountSubscribers: { description: 'Количество подписчиков пользователя', example: 0 },
  AccessToken: { description: 'Access token' },
  RefreshToken: { description: 'Refresh token' },
  CurrentPassword: { description: 'Текущий пароль', example: 'Pa$$w0rD' },
  NewPassword: { description: 'Новый пароль', example: 'New_Pa$$w0rD' },
  Password: { description: 'Пароль', example: 'Pa$$w0rD' },
  Avatar: { description: 'Ссылка на аватар пользователя' },
  Sex: { description: 'Пол', example: Sex.Female, enum: Sex },
  DateOfBirth: { description: 'Дата рождения', example: new Date() },
  Description: { description: 'Текст с общей информацией', example: 'Текст с общей информацией  о пользователе' },
  Location: { description: 'Станция метро', example: UserLocation.Petrogradskaya, enum: UserLocation },
  BackgroundImage:  { description: 'Фоновая картинка для карточки пользователя' },
  Role:  { description: 'Роль пользователя', example: UserRole.Coach, enum: UserRole },
} as const;