require('dotenv').config();

export const APP_VERSION = process.env.APP_VERSION || '0.0.1';
export const PORT = process.env.PORT || '3001';
export const BILEGO_URL =
  process.env.BILEGO_URL || 'http://chekisu6.bget.ru/wp-json/bilego/v1/front';
export const CLIENT_URL = process.env.CLIENT_URL || '*';

export const JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || 'secret-access';
export const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || 'secret-refresh';
export const JWT_ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES || '15m';
export const JWT_REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES || '60d';
