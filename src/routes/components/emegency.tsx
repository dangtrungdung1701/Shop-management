import { lazy } from "react";

import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";

import EmergencyIcon from "icons/Dashboard/Emergency";

const Emergency = lazy(() => import("pages/dashboard/Emergency"));

const ConfiguredDevice = lazy(() => import("pages/dashboard/devices/AddEdit"));

export const emergencyRoute: IRoutes = {
  name: "Quản lý khẩn cấp",
  path: PATH.EMERGENCY.SELF,
  exact: true,
  isPrivate: true,
  Icon: <EmergencyIcon />,
  Component: Emergency,
};

export const detailEmergencyRoute: IRoutes = {
  name: "Chi tiết khẩn cấp",
  path: PATH.EMERGENCY.DETAIL,
  exact: true,
  Component: ConfiguredDevice,
  isPrivate: true,
  hiddenRoute: true,
};
