import { ECity } from './enums';

export type Id = number;

interface IPost {
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  images?: ImageType[];
}

export interface IEvent extends IPost {
  age?: number;
  city: ECity;
  artist?: IArtist;
  item?: IItem;
  manager?: IManager;
  deal?: number;
  managerProps?: string;
  categories?: ICategory[];
  genres?: IGenre[];
  selections?: ISelection[];
  feelings?: IFeeling[];
  series?: IEvent[];
  startDate: Date;
  endDate: Date;
  slider?: IEventSlider;
  yamusic?: string;
  youtube?: string;
}

export interface IArtist extends IPost {
  image?: ImageType;
  background?: ImageType;
}

export interface IItem extends IPost {
  type?: IItemType[];
  address?: string;
  latitude?: number;
  longitude?: number;
  swzoom?: number;
  metro?: string[];
}

export interface IManager extends IPost {}

export interface INews extends IPost {}

export interface IEventSlider {}

export type ImageType = string;

interface ITerm {
  id: number;
  name: string;
  description?: string;
  slug: string;
}

export interface ICategory extends ITerm {
  image: ImageType;
}

export interface IGenre extends ITerm {
  image: ImageType;
}

export interface ISelection extends ITerm {
  sort: number;
  isShow: boolean;
  image: ImageType;
}

export interface IFeeling extends ITerm {}

export interface IItemType extends ITerm {
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
