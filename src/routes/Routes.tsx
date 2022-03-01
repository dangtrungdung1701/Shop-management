import { IRoute, IRoutes } from "typings";

import { rootRoute, authRoutes, notFoundRoute } from "./components/publics";
import { dashboardRoute } from "./components/dashboard";
import { usersRoute } from "./components/user";
import { sourceManagementRoute } from "./components/sourceManagement";
import { devicesRoute } from "./components/device";
import {
  scheduleRoute,
  createScheduleRoute,
  editScheduleRoute,
} from "./components/schedule";

const flattenRoutes = (routes: IRoutes[]): IRoute[] => {
  let flatRoutes: IRoute[] = [];
  routes = routes || [];
  routes.forEach(item => {
    flatRoutes.push(item);
    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

const dashboardRoutes: IRoutes[] = [
  dashboardRoute,
  devicesRoute,
  sourceManagementRoute,
  scheduleRoute,
  usersRoute,
  createScheduleRoute,
  editScheduleRoute,
];

const otherRoutes: IRoutes[] = [rootRoute, authRoutes, notFoundRoute];

const allRoutes = [...otherRoutes, ...dashboardRoutes];

const flattenedRoutes = flattenRoutes(allRoutes);

export { allRoutes, flattenedRoutes, notFoundRoute, dashboardRoutes };
