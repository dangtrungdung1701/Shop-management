import { lazy } from "react";

import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";

import UserIcon from "icons/Dashboard/User";

const Admin = lazy(() => import("pages/dashboard/Users/Admin"));
const Normal = lazy(() => import("pages/dashboard/Users/Normal"));

export const usersRoute: IRoutes = {
  name: "Quản lý người dùng",
  path: PATH.USER.SELF,
  exact: true,
  isPrivate: true,
  Icon: <UserIcon />,
  children: [
    {
      name: "Quản trị viên",
      path: PATH.USER.ADMIN,
      exact: true,
      Component: Admin,
      isPrivate: true,
    },
    {
      name: "Người dùng",
      path: PATH.USER.NORMAL,
      exact: true,
      Component: Normal,
      isPrivate: true,
    },
  ],
};
