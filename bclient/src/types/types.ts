export const transitionTimingFunction = 'cubic-bezier(0, .9, .57, 1)' as const;

export type User = {
  name: string;
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
