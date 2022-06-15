import { lazy } from "react";

import { PATH } from "common/constants/routes";

import MapIcon from "icons/Dashboard/Map";

import { IRoutes } from "typings";

const Map = lazy(() => import("pages/dashboard/Map"));

export const mapRoute: IRoutes = {
  name: "Bản đồ thiết bị",
  path: PATH.MAP,
  exact: true,
  Component: Map,
  isPrivate: true,
  Icon: <MapIcon />,
};
