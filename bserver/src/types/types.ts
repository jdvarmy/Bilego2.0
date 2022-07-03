import { TermType } from './enums';
import { UserDto } from '../dtos/UserDto';

export const CookieTokenName = 'refreshToken' as const;

export type ID = number | string;
export type UID = string;

export interface ItemType extends Term {
  image: ImageType;
}

export interface EventSlider {}

export type ImageType = string;

export interface Term {
  name: string;
  slug: string;
  description?: string;
}

export interface TermCategory extends Term {
  showInMenu: boolean;
  sort?: number;
  icon?: ImageType;
}

export interface TermGenre extends Term {
  icon?: ImageType;
}

export interface TermSelection extends Term {
  showInMainPage: boolean;
  showInMenu: boolean;
  sort?: number;
  image?: ImageType;
}

export interface TermFeeling extends Term {
  icon?: ImageType;
}

export type WPError = {
  code: string;
  message: string;
  data: {
    status: boolean;
    code: number;
  };
};

export type LoginUser = {
  email: string;
  password: string;
  ip?: string | null;
};

export type RegisterUser = LoginUser & {
  name: string;
};

export type UserTokens = {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
};

export interface Slide {
  title: string;
  slug: string;
  image: string;
  date?: Date;
  terms?: string[];
}

export type EventRequestPropType = {
  [TermType.eventCategory]?: string[] | 'all';
  [TermType.eventGenre]?: string[] | 'all';
  [TermType.eventFeeling]?: string[] | 'all';
  [TermType.eventSelection]?: string[] | 'all';
};
