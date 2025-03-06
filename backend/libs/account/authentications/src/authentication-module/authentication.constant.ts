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
    MinLength: 3,
    MaxLength: 50,
  },
} as const;

export const AuthenticationValidateMessage = {
  Email: 'The email is not valid',
  Password: `Min length for password is ${AuthValidateValue.Password.MinLength}, max is ${AuthValidateValue.Password.MaxLength}`,
  Name: `Min length for name is ${AuthValidateValue.Name.MinLength}, max is ${AuthValidateValue.Name.MaxLength}`,
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
} as const;