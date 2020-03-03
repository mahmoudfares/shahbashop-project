import React from "react";
import { LoginService as SignInService } from "../../services/AuthService";
import { setToken } from "../../utils/cookies";
import { useTranslation } from "react-i18next";
import "./signIn.scss";
import { NavLink } from "react-router-dom";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { withFormik, Form, Field } from "formik";
const Yup = require('yup')


const SignInForm = props => {
  const { values, touched, errors, handleChange, handleSubmit, isSubmitting, isValidating } = props;

  const { t } = useTranslation();

  let emailError = touched.email && errors.email && t("shared.email") + " " + t(`errors.${errors.email}`);
  let passwordError = touched.password && errors.password && t("shared.password") + " " + t(`errors.${errors.password}`);

  console.log(props.isValid)


  return (
    <div className="col-lg-12 bg-warning login row">
      <Form className="col-lg-10 bg-white login-form align-self-center">
        <img className="logo" alt="logo" src={require(`../../images/White-square.jpg`)} />
        
        <h1 className="text-center title">{t("signin.name")}</h1>
        <p>{t("signin.welcomeText")}</p>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className={`input-group-text  bg-warning ${emailError ? "text-danger" : "text-dark"}`} id="basic-addon1"><FaEnvelope /></span>
          </div>
          <Field placeholder={t("shared.enterEmail")} className="form-control" type="email" name="email" onChange={handleChange} value={values.email}/>
          <div className="input-border" id="email-input-border"/>
        </div>
        
        {emailError ? <div className="alert alert-danger mb-2">{emailError}</div> : <div className="mb-3" />}

        <div className="input-group mb-3">
          <div className="input-group-prepend">
              <span className={`input-group-text  bg-warning ${passwordError ? "text-danger" : "text-dark"}`} id="basic-addon1"><FaKey /></span>
          </div>
          <Field className="form-control" type="password" name="password" placeholder={t("shared.enterPassword")} onChange={handleChange} value={values.password}/>
          <div className="input-border" id="password-input-border"/>
        </div>
        {passwordError ? <div className="alert alert-danger mb-2">{passwordError}</div> : <div className="mb-3" />}

        <div>
           <NavLink className="note" to="/signup">{t("signin.notCustomerYet")}</NavLink>
        </div>
        <div className="text-center">
          <input disabled={isSubmitting} className="btn btn-warning" type="submit" value={t("signin.name")} />
        </div>
        </Form>
    </div>
      
  );
}

const SignIn = withFormik({
  mapPropsToValues(props) {
    return {
      email: "",
      password: ""
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email("notValid").required("required"),
    password: Yup.string().min(8, "tooShort").required("required").matches(/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,'passwordAllowedCharacters')
  }),
  handleSubmit(values) {
    SignInService(values.email, values.password)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  },
  handleChange(value) {
    console.log(value)
  }
})(SignInForm);

export default SignIn;