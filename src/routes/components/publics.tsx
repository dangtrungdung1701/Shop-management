import { lazy } from "react";
import { Redirect } from "react-router";

import { PATH } from "common/constants/routes";

import { IRoutes } from "typings";

import NotFound from "pages/NotFound";

const Login = lazy(() => import("pages/Login"));

export const rootRoute: IRoutes = {
  name: "root",
  path: "/",
  exact: true,
  Component: () => <Redirect to={PATH.DASHBOARD} />,
  isPrivate: true,
};

export const authRoutes: IRoutes = {
  name: "auth",
  path: PATH.AUTH.SELF,
  isPrivate: false,
  children: [
    {
      name: "login",
      path: PATH.AUTH.LOGIN,
      Component: Login,
      isPrivate: false,
    },
  ],
};

export const notFoundRoute: IRoutes = {
  name: "notfound",
  path: PATH.NOT_FOUND,
  exact: false,
  Component: NotFound,
  isPrivate: false,
};
