import React from "react";
import { Redirect, Route } from "react-router-dom";
import { userIsAdmin } from "../../utils/cookies";

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  return(
       <Route {...rest} render={(props) => (
        userIsAdmin()
        ? <Component {...props} />
        : <Redirect to="/login" />
        )}>
        </Route >
)};

export default AdminPrivateRoute;
