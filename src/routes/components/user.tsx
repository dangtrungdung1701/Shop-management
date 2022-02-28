import { lazy } from "react";

import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";

import UserIcon from "icons/Dashboard/User";

const Normal = lazy(() => import("pages/dashboard/Users"));

export const usersRoute: IRoutes = {
  name: "Quản lý người dùng",
  path: PATH.USER,
  exact: true,
  isPrivate: true,
  Icon: <UserIcon />,
  Component: Normal,
};
