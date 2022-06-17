import { City, TermType } from './enums';
import { UserDto } from '../dtos/UserDto';

export const CookieTokenName = 'refreshToken' as const;

export type ID = number | string;
export type UID = string;

interface Post {
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  images?: ImageType[];
}

// todo: remove
export interface Event extends Post {
  age?: number;
  city: City;
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

export interface ItemType extends Term {
  image: ImageType;
}

export interface Manager extends Post {}

export interface News extends Post {}

export interface Ticket {}

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

export interface Tickets {}

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
