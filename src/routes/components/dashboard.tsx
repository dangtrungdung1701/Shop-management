import { lazy } from "react";

import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";

import DashboardIcon from "icons/Dashboard/Dashboard";

const Dashboard = lazy(() => import("pages/dashboard/Dashboard"));

export const dashboardRoute: IRoutes = {
  name: "Tổng quan",
  path: PATH.DASHBOARD,
  exact: true,
  Component: Dashboard,
  isPrivate: true,
  Icon: <DashboardIcon />,
};
