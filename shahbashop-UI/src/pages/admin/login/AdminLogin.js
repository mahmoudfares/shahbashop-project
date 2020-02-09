import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "../../../components/admin/Login";
import AuthService from "../../../services/AuthService";
import { setCookie } from "../../../utils/cookies";
import {Redirect} from "react-router-dom";
import "./adminLogin.scss";


class AdminLogin extends Component {
  authService = new AuthService();

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }

  submit = data => {
    this.authService
      .login(data.email, data.password)
      .then(res => {
        this.setState({ redirect: true });
        setCookie(res.data.token);
      })
      .catch(err => console.log(err));
  };

  render() {
    const {redirect} = this.state;
    
    if(redirect) {return <Redirect to="/admin/dashboard" />};

    return (
      <div className="login-container">
        <div className="col-sm-12">
        <Login submit={this.submit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
