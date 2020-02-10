import React from "react";
import { Redirect, Route } from "react-router-dom";
import { checkToken } from "../../utils/cookies";

const AdminPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkToken() !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/admin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default AdminPrivateRoute;
