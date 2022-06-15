/**
 * @description This will help you redirect by using history
 *  - Make sure that you take url from /constants/routes/index.ts
 *    It will make sure that URL will consistently
 *  @example
 *    const Component = () => {
 *      const redirect = useRedirect();
 *      //....
 *      redirect(PATH.HOME)
 *    }
 */

import { useCallback } from "react";
import { useHistory } from "react-router";

import { PATH_URLS } from "common/constants/routes";
import { cleanObject } from "common/functions";

export const useRedirect = () => {
  const history = useHistory();
  const redirect = useCallback(
    (url: string, params: any = {}, query: any = {}) => {
      if (!PATH_URLS.includes(url)) {
        console.error(new Error(`[Redirect] Not found route: "${url}"`));
        return;
      }

      if (params) {
        for (const key in params) {
          const value = params[key] || "-";
          url = url.replace(`/:${key}`, `/${value}`);
        }
      }

      if (Object.keys(query).length) {
        const queryString = renderQueryStringFromObject(
          cleanObject(query) as any,
        );
        url += `?${queryString}`;
      }

      history.push(url);
    },
    [],
  );

  return redirect;
};

const renderQueryStringFromObject = (query: Record<string, string>) => {
  return new URLSearchParams(query)?.toString();
};
