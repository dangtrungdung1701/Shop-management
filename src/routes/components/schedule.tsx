import { lazy } from "react";

import { IRoutes } from "typings";
import { PATH } from "common/constants/routes";

import SchduleIcon from "icons/Dashboard/Schedule";

const Schedule = lazy(() => import("pages/dashboard/Schedule"));
const CreateEdit = lazy(() => import("pages/dashboard/Schedule/AddEdit"));

export const scheduleRoute: IRoutes = {
  name: "Quản lý lịch phát",
  path: PATH.SCHEDULE.SELF,
  exact: true,
  isPrivate: true,
  Icon: <SchduleIcon />,
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
