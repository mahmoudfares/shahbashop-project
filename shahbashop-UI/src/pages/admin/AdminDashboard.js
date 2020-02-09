import React, { Component } from "react";
import {Switch, Route, NavLink} from "react-router-dom";
import Statistic from "./Statistic";
import Products from "./products/Products";
import Product from "./products/singleProduct/Product";
import "./adminDashboard.scss";
import Categories from "./categories/Categories";

class AdminDashboard extends Component {
  render() {
    return (
      <>
        <div className="sidebare col-sm-2">
          <div className="link-list">
        <NavLink activeClassName="active" exact={true} to="/admin/dashboard">Statistic</NavLink>
        <NavLink activeClassName="active" to="/admin/dashboard/products">Products</NavLink>
        <NavLink activeClassName="active"to="/admin/dashboard/categories">Categories</NavLink>
          </div>
        </div>
        <div className="col-sm-10 row">
        <Switch>
          <Route path="/admin/dashboard" exact={true} component={Statistic}></Route>
          <Route exact={true} path="/admin/dashboard/products" component={Products}></Route>
          <Route path="/admin/dashboard/products/:id" component={Product}></Route>
          <Route path="/admin/dashboard/categories" component={Categories}></Route>
        </Switch>
        </div>
      </>
      );
  }
}

export default AdminDashboard;
