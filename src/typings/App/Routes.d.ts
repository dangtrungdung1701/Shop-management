import React from "react";

import { IIconSVGProps } from "./Icons";

export interface IRoute {
  name: string;
  path: string;
  isPrivate: boolean;
  exact?: boolean;
  Component?: JSX.Element<any, any>;
  Icon?: React.ReactNode;
  /**
   * this route won't be appear in dashboard drawer.
   * it is just accessed by URL
   */
  hiddenRoute?: boolean;
}

export type IRoutes = IRoute &
  (
    | {
        readonly children?: undefined;
        Component: JSX.Element<any, any>;
      }
    | {
        children: IRoutes[];
        readonly Component?: undefined;
      }
  );
