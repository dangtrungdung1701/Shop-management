import { lazy } from "react";

import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";

import ChallengeIcon from "icons/Dashboard/Challenge";

const Configured = lazy(() => import("pages/dashboard/devices/Configured"));
const NotConfigured = lazy(
  () => import("pages/dashboard/devices/NotConfigured"),
);
const ConfiguredDevice = lazy(() => import("pages/dashboard/devices/AddEdit"));

export const devicesRoute: IRoutes = {
  name: "Quản lý thiết bị",
  path: PATH.DEVICE.SELF,
  exact: true,
  isPrivate: true,
  Icon: <ChallengeIcon />,
  children: [
    {
      name: "Đã cấu hình",
      path: PATH.DEVICE.CONFIGURED,
      exact: true,
      Component: Configured,
      isPrivate: true,
    },
    {
      name: "Chưa cấu hình",
      path: PATH.DEVICE.NOT_CONFIGURED,
      exact: true,
      Component: NotConfigured,
      isPrivate: true,
    },
    {
      name: "Thêm thiết bị",
      path: PATH.DEVICE.CREATE_DEVICE,
      exact: true,
      Component: ConfiguredDevice,
      isPrivate: true,
      hiddenRoute: true,
    },
    {
      name: "Cấu hình thiết bị",
      path: PATH.DEVICE.EDIT_DEVICE,
      exact: true,
      Component: ConfiguredDevice,
      isPrivate: true,
      hiddenRoute: true,
    },
  ],
};
