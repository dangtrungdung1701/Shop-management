import { lazy } from "react";

import { PATH } from "common/constants/routes";

import DashboardIcon from "icons/Dashboard/Dashboard";

import { IRoutes } from "typings";

const Dashboard = lazy(() => import("pages/dashboard/Dashboard"));

export const dashboardRoute: IRoutes = {
  name: "Tổng quan",
  path: PATH.DASHBOARD,
  exact: true,
  Component: Dashboard,
  isPrivate: true,
  Icon: <DashboardIcon />,
};
