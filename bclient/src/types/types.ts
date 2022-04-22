import { Term } from './enums';

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
  title: string;
  slug: string;
}

export interface Event extends Entry {}

export interface Item extends Entry {}

export interface Artist extends Entry {}

// TAXONOMY //
export interface Taxonomy {
  name: string;
  slug: string;
  description?: string;
}

export interface Category extends Taxonomy {
  showInMenu: boolean;
  sort?: number;
  icon?: string;
}

export interface Genre extends Taxonomy {
  icon?: string;
}

export interface Selection extends Taxonomy {
  showInMainPage: boolean;
  showInMenu: boolean;
  sort?: number;
  image?: string;
}

export interface Feeling extends Taxonomy {
  icon?: string;
}

export type ResponseTaxonomies = {
  [Term.category]: Category[];
  [Term.genre]: Genre[];
  [Term.feeling]: Feeling[];
  [Term.selection]: Selection[];
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
