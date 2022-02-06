import { ECity, ETermType } from './enums';

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
  categories?: ICategory[];
  genres?: IGenre[];
  selections?: ISelection[];
  feelings?: IFeeling[];
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

export interface ICategory extends Term {
  image: ImageType;
}

export interface IGenre extends Term {
  image: ImageType;
}

export interface ISelection extends Term {
  sort: number;
  isShow: boolean;
  image: ImageType;
}

export interface IFeeling extends Term {}

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
