import React, { Component } from "react";
import { connect } from "react-redux";
import AdminPrivateRoute from "./AdminPrivateRoute";
import AdminDashboard from "./AdminDashboard";
import { Route, Switch } from "react-router-dom";
import AdminLogin from "./login/AdminLogin";

class AdminApp extends Component {
  render() {
    return (
      <div className="row">
        <Switch>
          <Route path="/admin" exact={true} component={AdminLogin} />
          <AdminPrivateRoute path="/admin/dashboard" component={AdminDashboard} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(AdminApp);
