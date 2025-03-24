type User = {
  id: string,
  name: string;
  email: string;
}

export type UserData = User & {
  accessToken: string;
};

export type UserAuth = Pick<User, 'email'> & { password: string };

export type UserRegister = Pick<User, 'name'> & UserAuth;