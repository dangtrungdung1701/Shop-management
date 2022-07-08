import { lazy } from "react";

import { PATH } from "common/constants/routes";

import EmergencyIcon from "icons/Dashboard/Emergency";

import { IRoutes } from "typings";

const Emergency = lazy(() => import("pages/dashboard/Emergency"));

const ConfiguredEmergencyProgram = lazy(
  () => import("pages/dashboard/Emergency/Components/Detail"),
);

const EmergencyBroadcast = lazy(
  () => import("pages/dashboard/Emergency/Components/EmergencyBroadcastDialog"),
);

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
  Component: ConfiguredEmergencyProgram,
  isPrivate: true,
  hiddenRoute: true,
};

export const emergencyBroadcastRoute: IRoutes = {
  name: "Phát khẩn cấp",
  path: PATH.EMERGENCY.EMERGENCY_BROADCAST,
  exact: true,
  Component: EmergencyBroadcast,
  isPrivate: true,
  hiddenRoute: true,
};
