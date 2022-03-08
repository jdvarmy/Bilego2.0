import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { WPError } from './types/types';
import { Response } from 'express';
import { ETokens } from './types/enums';

export const checkWPErrorResponse = (response: any): false => {
  response = response as WPError;

  if (
    response.data &&
    'status' in response.data &&
    response.data.status === false
  ) {
    throw new HttpException(response, response.data.code);
  }

  return false;
};

export const setCookieRefreshToken = (
  response: Response,
  token: string,
): void => {
  response.cookie(ETokens.refresh, token, {
    httpOnly: true,
    maxAge: 30 * 86400e3,
  });
};
