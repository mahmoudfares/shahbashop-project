import React, {Component} from "react";
import { useForm } from "react-hook-form";
import { LoginService as SignInService } from "../../services/AuthService";
import { setToken } from "../../utils/cookies";
import { useTranslation } from "react-i18next";
import "./signIn.scss";
import { NavLink } from "react-router-dom";
import { FaEnvelope,FaKey } from "react-icons/fa";

const SignIn = (props) => {
  const { t } = useTranslation();
  
  const { register, handleSubmit, errors } = useForm();

  const formErrors = {
    email: {
      message: ""
    }
  };

  const validateForm = () => {

    console.log(errors);

    if (errors.email) {
      errors.email.type === "required"
        ? (formErrors.email.message = "Email field is required")
        : (formErrors.email.message = "Email field min length is 2");
    }
  };

  const onSubmit = (data) => {
    SignInService(data.email, data.password)
      .then(res => {
        setToken(res.data.token);
        props.history.goBack();
      })
      .catch(err => console.log(err));
  }

  validateForm();

console.log(errors)
  return (
    
    <div className="col-lg-12 bg-warning login">
      <form onSubmit={handleSubmit(onSubmit)} className="col-lg-10 bg-white login-form">
        <img className="logo" alt="logo" src={require(`../../images/White-square.jpg`)} />
        
        <h1 className="text-center title">{t("signin.name")}</h1>
        <p>{t("signin.welcomeText")}</p>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text  bg-warning text-dark" id="basic-addon1"><FaEnvelope /></span>
          </div>
          <input placeholder={t("shared.enterEmail")} className="form-control" type="email" name="email" ref={register({ required: true, minLength: 2 })} />
          <div className="input-border" id="email-input-border"/>
        </div>
        
        <div className="input-group mb-3">
          <div className="input-group-prepend">
              <span className="input-group-text  bg-warning text-dark" id="basic-addon1"><FaKey /></span>
          </div>
          <input className="form-control" name="password" type="password" name="password" ref={register} placeholder={t("shared.enterPassword")} ref={register({require: true})} />
          {errors.email && <p>email is require</p>}

          <div className="input-border" id="password-input-border"/>
        </div>
        <div>
           <NavLink className="note" to="/signup">{t("signin.notCustomerYet")}</NavLink>
        </div>
        <div className="text-center">
          <input className="btn btn-warning" type="submit" value={t("signin.name")} />
        </div>
        </form>
    </div>
      
  );
}

export default SignIn;