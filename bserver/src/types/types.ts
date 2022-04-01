import { ECity, ETermType } from './enums';

export const CookieTokenName = 'refreshToken' as const;

export type Id = number | string;

interface Post {
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  images?: ImageType[];
}

export interface Event extends Post {
  age?: number;
  city: ECity;
  artist?: Artist;
  item?: Item;
  manager?: Manager;
  deal?: number;
  managerProps?: string;
  categories?: TermCategory[];
  genres?: TermGenre[];
  selections?: TermSelection[];
  feelings?: TermFeeling[];
  series?: Event[];
  startDate: Date;
  endDate: Date;
  slider?: EventSlider;
  yamusic?: string;
  youtube?: string;
}

export interface Artist extends Post {
  image?: ImageType;
  background?: ImageType;
}

export interface Item extends Post {
  type?: ItemType[];
  address?: string;
  latitude?: number;
  longitude?: number;
  swzoom?: number;
  metro?: string[];
}

export interface Manager extends Post {}

export interface News extends Post {}

export interface Ticket {}

export interface EventSlider {}

export type ImageType = string;

export interface Term {
  id: number;
  type?: ETermType;
  name?: string;
  description?: string;
  slug?: string;
}

export interface TermCategory extends Term {
  image: ImageType;
}

export interface TermGenre extends Term {
  image: ImageType;
}

export interface TermSelection extends Term {
  sort: number;
  isShow: boolean;
  image: ImageType;
}

export interface TermFeeling extends Term {}

export interface ItemType extends Term {
  image: ImageType;
}

export type WPError = {
  code: string;
  message: string;
  data: {
    status: boolean;
    code: number;
  };
};

export interface User {
  id: Id;
  name: string;
  email: string;
  roles?: string[];
  tickets?: Tickets;
}

export interface Tickets {}

export type LoginUser = {
  email: string;
  password: string;
  ip: string;
};

export type RegisterUser = LoginUser & {
  name: string;
};

export type ReturnToken = { accessToken: string };
export type UserTokens = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
