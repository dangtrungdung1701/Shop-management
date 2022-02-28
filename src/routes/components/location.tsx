import { lazy } from "react";

import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";

import LocationIcon from "icons/Dashboard/Location";

const Province = lazy(() => import("pages/dashboard/location/Province"));
const District = lazy(() => import("pages/dashboard/location/District"));
const Ward = lazy(() => import("pages/dashboard/location/Ward"));

export const locationRoute: IRoutes = {
  name: "Quản lý địa phương",
  path: PATH.LOCATION.SELF,
  exact: true,
  isPrivate: true,
  Icon: <LocationIcon />,
  children: [
    {
      name: "Tỉnh/TP",
      path: PATH.LOCATION.PROVINCE,
      exact: true,
      Component: Province,
      isPrivate: true,
    },
    {
      name: "Quận/Huyện/Thị Xã",
      path: PATH.LOCATION.DISTRICT,
      exact: true,
      Component: District,
      isPrivate: true,
    },
    {
      name: "Phường/Xã/Thị Trấn",
      path: PATH.LOCATION.WARD,
      exact: true,
      Component: Ward,
      isPrivate: true,
    },
  ],
};
