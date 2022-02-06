import { WPError } from './types/types';

export const checkErrorResponse = (response): false | WPError => {
  if (
    response.data &&
    'status' in response.data &&
    response.data.status === false
  ) {
    return response as WPError;
  }

  return false;
};
