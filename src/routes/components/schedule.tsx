import { lazy } from "react";

import { PATH } from "common/constants/routes";

import ScheduleIcon from "icons/Dashboard/Schedule";

import { IRoutes } from "typings";

const Schedule = lazy(() => import("pages/dashboard/Schedule"));
const CreateEdit = lazy(() => import("pages/dashboard/Schedule/AddEdit"));

export const scheduleRoute: IRoutes = {
  name: "Quản lý lịch phát",
  path: PATH.SCHEDULE.SELF,
  exact: true,
  isPrivate: true,
  Icon: <ScheduleIcon />,
  Component: Schedule,
};

export const createScheduleRoute: IRoutes = {
  name: "Thêm lịch phát",
  path: PATH.SCHEDULE.CREATE,
  exact: true,
  Component: CreateEdit,
  isPrivate: true,
  hiddenRoute: true,
};

export const editScheduleRoute: IRoutes = {
  name: "Chỉnh sửa lịch phát",
  path: PATH.SCHEDULE.EDIT,
  exact: true,
  Component: CreateEdit,
  isPrivate: true,
  hiddenRoute: true,
};
