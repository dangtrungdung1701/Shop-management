import { lazy } from "react";

import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";

import MapIcon from "icons/Dashboard/Map";

const Map = lazy(() => import("pages/dashboard/Map"));

export const mapRoute: IRoutes = {
  name: "Bản đồ thiết bị",
  path: PATH.MAP,
  exact: true,
  Component: Map,
  isPrivate: true,
  Icon: <MapIcon />,
};
