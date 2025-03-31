import { jwtDecode } from 'jwt-decode';

const AUTH_TOKEN_KEY_NAME = 'access-token';

export type Token = string;

interface JWTPayload {
  exp: number; // Время истечения в формате timestamp (seconds since epoch)
  [key: string]: any; // Другие данные из payload
}

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);

  if (!token) {
    return '';
  }

  try {
    const decodedToken: JWTPayload = jwtDecode(token);
    const expiry = decodedToken.exp * 1000; // Convert seconds to milliseconds

    if (expiry <= Date.now()) {
      dropToken(); // Token expired, remove it
      return '';
    }

    return token;
  } catch (error) {
    dropToken(); // Invalid token, remove it
    return '';
  }
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

