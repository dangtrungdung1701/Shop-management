import React, { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { PATH } from "common/constants/routes";

import PrivateRoute from "components/PrivateRoute";

import DashboardLayout from "layouts/Dashboard";
import AuthLayout from "layouts/Auth";

import {
  flattenedRoutes as routes,
  notFoundRoute,
  notPermissionRoute,
} from "./Routes";
import PageLoading, { Spinner } from "components/PageLoading";
import useStore from "zustand/store";
import useCheckPermission from "hooks/useCheckPermission";

const Routers: React.FC = props => {
  const { currentUser } = useStore();
  const [privateRoutes, setPrivateRoutes] = useState(() =>
    routes.filter(route => route.isPrivate),
  );
  const [publicRoutes] = useState(() =>
    routes.filter(route => !route.isPrivate),
  );
  useEffect(() => {
    if (currentUser && privateRoutes) {
      const newPrivateRoutes = privateRoutes.map(route => {
        if (
          route.path.includes(PATH.DEVICE.SELF) &&
          !useCheckPermission("DeviceManager", currentUser)
        ) {
          return { ...route, name: "" };
        }
        if (
          route.path.includes(PATH.SOURCE_MANAGEMENT.SELF) &&
          !useCheckPermission("AudioSourceManager", currentUser)
        ) {
          return { ...route, name: "" };
        }
        if (
          route.path.includes(PATH.SCHEDULE.SELF) &&
          !useCheckPermission("ScheduleManager", currentUser)
        ) {
          return { ...route, name: "" };
        }
        if (
          route.path.includes(PATH.EMERGENCY.SELF) &&
          !useCheckPermission("EmergencyOperator", currentUser)
        ) {
          return { ...route, name: "" };
        }
        if (
          route.path.includes(PATH.USER) &&
          !useCheckPermission("UserManager", currentUser)
        ) {
          return { ...route, name: "" };
        }
        return route;
      });
      setPrivateRoutes(newPrivateRoutes);
    }
  }, [currentUser]);

  return (
    <Router>
      <Switch>
        <Route
          key={notPermissionRoute.path}
          exact
          path={notPermissionRoute.path}
          component={notPermissionRoute.Component}
        />
        <Route
          key={notFoundRoute.path}
          exact
          path={notFoundRoute.path}
          component={notFoundRoute.Component}
        />
        <Route path={PATH.AUTH.LOGIN}>
          <AuthLayout>
            <Suspense
              fallback={
                <div>
                  <Spinner />
                </div>
              }
            >
              <Switch>
                {publicRoutes.map(({ Component, path }) => {
                  return (
                    Component && (
                      <Route
                        key={path}
                        path={path}
                        exact
                        component={Component}
                      />
                    )
                  );
                })}
              </Switch>
            </Suspense>
          </AuthLayout>
        </Route>
        <Route path="/">
          <DashboardLayout {...props}>
            <Suspense
              fallback={
                <div>
                  <Spinner />
                </div>
              }
            >
              <Switch>
                {privateRoutes.map(route => {
                  return (
                    route.Component && (
                      <PrivateRoute
                        key={route.path}
                        exact={route.exact}
                        {...route}
                      />
                    )
                  );
                })}
                <Redirect path="*" to={notFoundRoute.path} />
              </Switch>
            </Suspense>
          </DashboardLayout>
        </Route>
        {/* <Redirect path="*" to={notFoundRoute.path} /> */}
      </Switch>
    </Router>
  );
};

export default Routers;
