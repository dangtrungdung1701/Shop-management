import { Redirect, Route } from "react-router-dom";

import { isAuthenticated } from "common/utils/auth";
import { PATH } from "common/constants/routes";

import Meta from "components/Meta";
import ErrorBoundary from "components/ErrorBoundary";

import { IRoute } from "typings";

export default function PrivateRoute(props: IRoute): JSX.Element {
  const { Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuthenticated()) {
          return (
            <Redirect
              to={{
                pathname: PATH.AUTH.LOGIN,
                state: { from: props.location },
              }}
            />
          );
        }
        if (!rest.name) {
          return (
            <Redirect
              to={{
                pathname: PATH.NOT_PERMISSION,
                state: { from: props.location },
              }}
            />
          );
        }

        return (
          <ErrorBoundary>
            <Meta title={rest.name} />
            <Component {...props} />
          </ErrorBoundary>
        );
      }}
    />
  );
}
