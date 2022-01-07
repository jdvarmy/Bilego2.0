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

export const stringifyQuery = (
  options: NodeJS.Dict<
    string | number | boolean | ReadonlyArray<string | number | boolean> | null
  >,
): string => {
  return Object.entries(options)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((item) => `${key}[]=${item}`).join('&');
      }

      return `${key}=${value}`;
    })
    .join('&');
};
