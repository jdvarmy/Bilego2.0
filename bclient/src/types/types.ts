import { Cities, HeaderType, SortType, EventTerm, ItemTerm } from './enums';

export const transitionTimingFunction = 'cubic-bezier(0, .9, .57, 1)' as const;
export const modalSelector = 'bmodal' as const;
export const storageTokenName = 'token' as const;
export const localStorageCityKey = '_bilego_c' as const;

export type User = {
  id: number;
  name: string;
  email: string;
};
export type RequestRegister = {
  email: string;
  name: string;
  password: string;
};
export type RequestLogin = {
  email: string;
  password: string;
};

export type ResponsePostsType<T> = {
  posts: T;
  seo: any;
};
export type ResponsePostType<T> = {
  post: T;
  seo: any;
};

interface Entry {
  id: number;
  title: string;
  slug: string;
}

export type EventHeaderType = {
  colors?: { title?: string; subtitle?: string };
  image?: string;
  imageId?: number;
  mobileImage?: string;
  mobileImageId?: number;
  subtitle?: string;
  title?: string;
  type?: HeaderType;
  video?: string;
};

export interface Event extends Entry {
  excerpt: string;
  club?: Item;
  categories?: { [key in EventTerm]: CategoryTax[] | GenreTax[] | FeelingTax[] | SelectionTax[] | null };
  dates?: { dateFrom: string; dateTo: string };
  recurring?: Event['dates'][];
  image?: string;
  meta?: EventMeta;
  content?: string;
}

export interface EventMeta {
  visitorAge?: number;
  artist?: any;
  city?: Cities;
  header?: EventHeaderType;
  isMainSlider?: boolean;
  organizer?: { id?: number; trade?: number; info?: string };
  place?: number;
  yamusic?: string;
  youtube?: string;
}

export type ParametersType = {
  city?: Cities | null;
  offset: number;
  count: number;
  sort?: SortType;
  weekends?: boolean;
  include?: {
    [key in EventTerm]?: string[] | 'all';
  };
  exclude?: {
    [key in EventTerm]?: string[] | 'all';
  };
};

export interface Item extends Entry {
  categories: { [key in ItemTerm]: ItemTax[] | null };
  content?: string;
  id: number;
  image?: string;
  meta: ItemMeta;
  slug: string;
  title: string;
}

export interface ItemMeta {
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  metro: { [index: string]: string };
  swzoom: number;
}

export interface Artist extends Entry {}

// TAXONOMY //
export interface Taxonomy {
  name: string;
  slug: string;
  description?: string;
}

export interface CategoryTax extends Taxonomy {
  showInMenu: boolean;
  sort?: number;
  icon?: string;
}

export interface GenreTax extends Taxonomy {
  icon?: string;
}

export interface SelectionTax extends Taxonomy {
  showInMainPage: boolean;
  showInMenu: boolean;
  sort?: number;
  image?: string;
}

export interface FeelingTax extends Taxonomy {
  icon?: string;
}

export interface ItemTax extends Taxonomy {
  image?: string;
}

export type ResponseTaxonomies = {
  [EventTerm.category]: CategoryTax[];
  [EventTerm.genre]: GenreTax[];
  [EventTerm.feeling]: FeelingTax[];
  [EventTerm.selection]: SelectionTax[];
};

// SLIDER //
export interface Slide {
  title: string;
  slug: string;
  image: string;
  categories: {
    genre: { name: string }[] | null;
    feeling: { name: string }[] | null;
  };
}

export interface WPError {
  code: string;
  data: { status: false; code: number };
  message: string;
}
