import { HTTP_URL, HTTP_VERSION } from './env';
import { City, EventHeaderType, PostStatus, TicketType, UserRole } from './enum';

export const loginPage = '/login';
export const storageTokenName = '_btoken' as const;
export const axiosBaseUrl = `${HTTP_URL}${HTTP_VERSION}/`;

export type ColorsFormat = 'plain' | 'hex' | 'rgb' | 'number' | 'unknown' | undefined;

export type User = {
  email: string;
  role: UserRole;
  uid?: string;
  name?: string;
  surname?: string;
  birthdate?: Date | null;
  phone?: string;
  avatar?: { id: number; name: string };
  status?: number;
  access?: { ip: string; device: string; update: Date }[];
  concertManagerInfo?: string;
  concertManagerPercentage?: number;
};

interface Post {
  uid?: string;
  slug?: string;
  status?: PostStatus;
  title?: string;
  text?: string;
  create?: Date;
  update?: Date;
  seo?: any;
}

export type EventDate = {
  uid: string;
  eventUid: string;
  type?: TicketType;
  map?: MapFile;
  dateFrom?: Date;
  dateTo?: Date;
  closeDateTime?: Date;
};

export interface Event extends Post {
  item?: Pick<Item, 'uid' | 'title' | 'city'>;
  artist?: Pick<Artist, 'uid' | 'title'>[];
  city?: City;
  eventManager?: any;
  taxonomy?: any;
  eventDates?: EventDate[];
  image?: any;
  fragment?: string;
  searchWords?: string;
  ageRestriction?: number;
  isShowOnSlider?: boolean;
  musicLink?: string;
  videoLink?: string;
  headerType?: EventHeaderType;
  headerImage?: any;
  headerVideo?: any;
  headerTitle?: string;
  headerSubtitle?: string;
  headerMeta?: string;
  headerTextColor?: string;
  concertManagerInfo?: string;
  concertManagerPercentage?: number;
}

export interface Item extends Post {
  image?: any;
  city?: City;
}
export interface Artist extends Post {
  avatar?: any;
}

export interface TicketOnSell {
  uid: string;
  price?: number;
  service?: number;
  dateFrom?: string | Date;
  dateTo?: string | Date;
  color?: string;
  totalPrice?: { service: number; price: number };
}
export interface Ticket {
  uid?: string;
  type?: TicketType;
  name?: string;
  description?: string;
  stock?: number;
  seat?: string;
  row?: string;
  sector?: string;
  sell?: TicketOnSell[];
}

// http
export type RequestAuth = {
  email: string;
  password: string;
  name?: string;
};
export type ResponseAuth = {
  accessToken: string;
  user: User;
};
export type RequestUser = RequestAuth & {
  uid?: string;
  status?: number;
  role?: UserRole;
  sendMail?: boolean;
  avatar?: number;
  surname?: string;
  birthdate?: Date | null;
  phone?: string;
  concertManagerInfo?: string;
  concertManagerPercentage?: number;
};
export type MediaFile = {
  id: number;
  encoding: string;
  mimetype: string;
  name: string;
  originalName: string;
  path: string;
  size: number;
};
export type MediaSelectData = { id: number; name: string };
export type MapFile = {
  uid: string;
  map?: MediaFile;
  minimap?: MediaFile;
  xml?: string;
  viewBox?: string;
  width?: number;
  height?: number;
  background?: any[];
  attributes?: any;
  metadata?: any[];
  paths?: any[];
  seats?: any[];
};
