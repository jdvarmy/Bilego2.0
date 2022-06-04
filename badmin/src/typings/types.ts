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
  birthdate?: Date | null;
  phone?: string;
  avatar?: string | number;
  status?: number;
  access?: { ip: string; device: string; update: Date }[];
  concertManagerInfo?: string;
  concertManagerPercentage?: number;
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
export type RequestUser = RequestAuth & {
  status?: number;
  role?: UserRole;
  sendMail?: boolean;
  avatar?: number;
  surname?: string;
  birthdate?: Date | null;
  phone?: string;
  concertManagerInfo?: string;
  concertManagerPercentage?: number;
};
export type MediaFile = {
  id: number;
  encoding: string;
  mimetype: string;
  name: string;
  originalName: string;
  path: string;
  size: number;
};
export type MediaSelectData = { id: number; name: string };
