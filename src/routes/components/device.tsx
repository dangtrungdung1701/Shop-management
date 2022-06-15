import { lazy } from "react";

import { PATH } from "common/constants/routes";

import DeviceIcon from "icons/Dashboard/Device";

import { IRoutes } from "typings";

const Province = lazy(() => import("pages/dashboard/devices/Province"));
const District = lazy(() => import("pages/dashboard/devices/District"));
const Ward = lazy(() => import("pages/dashboard/devices/Ward"));

const ConfiguredDevice = lazy(() => import("pages/dashboard/devices/AddEdit"));

export const devicesRoute: IRoutes = {
  name: "Quản lý thiết bị",
  path: PATH.DEVICE.SELF,
  exact: true,
  isPrivate: true,
  Icon: <DeviceIcon />,
  children: [
    {
      name: "Cấp Tỉnh/TP",
      path: PATH.DEVICE.PROVINCE,
      exact: true,
      Component: Province,
      isPrivate: true,
    },
    {
      name: "Cấp Quận/Huyện/Thị Xã",
      path: PATH.DEVICE.DISTRICT,
      exact: true,
      Component: District,
      isPrivate: true,
    },
    {
      name: "Cấp Phường/Xã/Thị Trấn",
      path: PATH.DEVICE.WARD,
      exact: true,
      Component: Ward,
      isPrivate: true,
    },
    {
      name: "Cấu hình thiết bị cấp Tỉnh/Thành phố",
      path: PATH.DEVICE.EDIT_DEVICE,
      exact: true,
      Component: ConfiguredDevice,
      isPrivate: true,
      hiddenRoute: true,
    },
    {
      name: "Cấu hình thiết bị cấp Quận/Huyện/Thị xã",
      path: PATH.DEVICE.EDIT_DEVICE,
      exact: true,
      Component: ConfiguredDevice,
      isPrivate: true,
      hiddenRoute: true,
    },
    {
      name: "Cấu hình thiết bị cấp Phường/Xã/Thị trấn",
      path: PATH.DEVICE.EDIT_DEVICE,
      exact: true,
      Component: ConfiguredDevice,
      isPrivate: true,
      hiddenRoute: true,
    },
  ],
};
