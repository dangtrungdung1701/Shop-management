import { Location } from "history";
import queryString from "query-string";

export const getQueryFromLocation = <T = any>(
  location: Location<any>,
): Partial<Record<keyof T, string>> => {
  const query = queryString.parse(location?.search);
  return query as any;
};
