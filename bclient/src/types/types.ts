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

export interface User {
  name?: string;
}
