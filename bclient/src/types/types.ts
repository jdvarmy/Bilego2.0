export const transitionTimingFunction = 'cubic-bezier(0, .9, .57, 1)' as const;
export const modalSelector = 'bmodal' as const;
export const storageTokenName = 'token' as const;

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

export interface Event {
  title: string;
  slug: string;
}

export interface Item {
  title: string;
  slug: string;
}

export interface Artist {
  title: string;
  slug: string;
}

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
