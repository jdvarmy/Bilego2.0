import { EUserRoles } from './enums';

export interface User {
  data: {
    ID: number;
    user_login: string;
    user_pass: string;
    user_nicename: string;
    user_email: string;
    user_url: string;
    user_registered: string;
    user_activation_key: string;
    user_status: string;
    display_name: string;
  };
  ID: number;
  caps: {
    subscriber: boolean;
  };
  cap_key: string;
  roles: EUserRoles[];
  allcaps: {
    read: boolean;
    level_0: boolean;
    subscriber: boolean;
  };
  filter: any;
  tickets?: Tickets;
}

export interface Tickets {}

export type LoginUser = {
  email: string;
  password: string;
};

export type RegisterUser = {
  name: string;
  email: string;
  password: string;
};

export type ReturnToken = { access_token: string };
