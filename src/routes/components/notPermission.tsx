import { PATH } from "common/constants/routes";

import NotPermission from "pages/NotPermission";

import { IRoutes } from "typings";

export const notPermissionRoute: IRoutes = {
  name: "notPermission",
  path: PATH.NOT_PERMISSION,
  exact: false,
  Component: NotPermission,
  isPrivate: false,
};
