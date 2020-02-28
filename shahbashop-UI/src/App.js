import React, {Suspense} from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import AdminPrivateRoute from "./pages/admin/AdminPrivateRoute";
import axios from "axios";
import ShahbaApp from "./pages/ShahbaApp";
import './main.scss';
import Navbar from "./components/application/navbar/Navbar";
import ChangLanguageModal from "./components/application/changeLanguageModal/ChangeLanguageModal";
import ShoppingCart from "./pages/shoppingCart/ShoppingCart";
import ReactNotification from 'react-notifications-component';
import ProductShow from "./pages/productShow/ProductShow";
import Search from "./pages/search/Search";
import Login from "./pages/login/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

function App() {
  return (
    <Suspense fallback="loading">
        <ReactNotification />
        <Navbar></Navbar>
        <ChangLanguageModal></ChangLanguageModal>
        <div className="container-fluid">
        <div className="row">
          <Switch>
            <Route exact path="/" component={ShahbaApp} />
            <Route path="/products/:id" component={ProductShow} />
            <Route path="/shopping-cart" component={ShoppingCart} />
            <Route path="/search" component={Search} />
            <Route path="/login" component={Login} />
            <AdminPrivateRoute component={AdminDashboard} />
          </Switch>
        </div>
        </div>
      </Suspense>
  );
}

export default App;
