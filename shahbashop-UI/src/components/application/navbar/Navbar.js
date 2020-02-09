import React from "react";
import "./navbar.scss";
import {NavLink} from "react-router-dom"; 
import {FaShoppingCart, FaUser} from "react-icons/fa";
import {connect} from "react-redux";
import { useTranslation } from "react-i18next";

function Navbar(props){
  const { t, i18n } = useTranslation();
    return(
      <nav className="navbar navbar-expand-lg navbar-light">
    <NavLink className="navbar-brand" to="/">{t('main.sub')}</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
    <ul className="navbar-nav mr-auto">
    <li className="nav-item">
    <NavLink className="nav-link" activeClassName="current-nav" exact={true} to="/">Home</NavLink>
    </li>
    <li className="nav-item">
    <NavLink className="nav-link" to="#">Features</NavLink>
    </li>
    <li className="nav-item">
    <NavLink className="nav-link" to="#">Pricing</NavLink>
    </li>
    </ul>
    <NavLink className="navbar-icons" to="/">
      <span>
          <FaUser></FaUser>
      </span>
    </NavLink>
    <NavLink className="navbar-icons" to="/shopping-cart">
      <span>
        <FaShoppingCart></FaShoppingCart>
      </span>
     <sup className="bg-success">{props.shoppingCart.length}</sup>
    </NavLink>
    </div>
    </nav>
    )
  } 

  const mapStateToProps = (state) => ({
    shoppingCart: state.shoppingCart,
  });
  
  export default connect(mapStateToProps, null)(Navbar);