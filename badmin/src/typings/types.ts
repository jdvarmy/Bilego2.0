import { HTTP_URL, HTTP_VERSION } from './env';
import { UserRole } from './enum';

export const loginPage = '/login';
export const storageTokenName = '_btoken' as const;
export const axiosBaseUrl = `${HTTP_URL}${HTTP_VERSION}/`;

export type User = {
  uid: string;
  email: string;
  role: UserRole;
  name?: string;
  surname?: string;
  birthdate?: string;
  phone?: string;
};

// http
export type RequestAuth = {
  email: string;
  password: string;
  name?: string;
};
export type ResponseAuth = {
  accessToken: string;
  user: User;
};
