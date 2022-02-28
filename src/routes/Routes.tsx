import { IRoute, IRoutes } from "typings";

import { rootRoute, authRoutes, notFoundRoute } from "./components/publics";
import { dashboardRoute } from "./components/dashboard";
import { usersRoute } from "./components/user";
import { locationRoute } from "./components/location";
import { sourceManagementRoute } from "./components/sourceManagement";
import { blogRoute } from "./components/blog";
import { devicesRoute } from "./components/device";

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
  usersRoute,
  devicesRoute,
  sourceManagementRoute,
  blogRoute,
  locationRoute,
];

const otherRoutes: IRoutes[] = [rootRoute, authRoutes, notFoundRoute];

const allRoutes = [...otherRoutes, ...dashboardRoutes];

const flattenedRoutes = flattenRoutes(allRoutes);

export { allRoutes, flattenedRoutes, notFoundRoute, dashboardRoutes };
