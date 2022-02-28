import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { flattenedRoutes as routes, notFoundRoute } from "./Routes";
import PrivateRoute from "components/PrivateRoute";
import DashboardLayout from "layouts/Dashboard";
import AuthLayout from "layouts/Auth";
import { PATH } from "common/constants/routes";

const Routers: React.FC = props => {
  const [privateRoutes] = useState(() =>
    routes.filter(route => route.isPrivate),
  );
  const [publicRoutes] = useState(() =>
    routes.filter(route => !route.isPrivate),
  );
  return (
    <Router>
      <Switch>
        <Route
          exact
          path={notFoundRoute.path}
          component={notFoundRoute.Component}
        />
        <Route path={PATH.AUTH.LOGIN}>
          <AuthLayout>
            <Suspense fallback={<div>Loading...</div>}>
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
            <Suspense fallback={<div>Loading</div>}>
              <Switch>
                {privateRoutes.map(route => {
                  return (
                    route.Component && (
                      <Route
                        key={route.path}
                        exact={route.exact}
                        path={route.path}
                        component={route.Component}
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
