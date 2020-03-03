import React from "react";
import "./signUp.scss";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { FaEnvelope,FaKey,FaCheck } from "react-icons/fa";
import { withFormik, Form, Field } from "formik";
const Yup = require('yup');


const SignUpForm = props => {
    const { t } = useTranslation();
    const { touched, errors, handleChange, handleSubmit, isSubmitting } = props;

    let emailError = touched.email && errors.email && t("shared.email") + " " + t(`errors.${errors.email}`);
    let passwordError = touched.password && errors.password && t("shared.password") + " " + t(`errors.${errors.password}`);
    let passwordConfirmationError = touched.passwordConfirmation && errors.passwordConfirmation && t(`shared.passwordConfirmation`) + " " + t(`errors.${errors.passwordConfirmation}`);

    return (
        <div className="col-lg-12 register bg-warning row">
            <Form className="col-lg-10 register-form bg-white align-self-center">
              <img className="logo" alt="logo" src={require(`../../images/White-square.jpg`)} />
                <h1 className="text-center title">{t("signup.name")}</h1>
                <p>{t("signup.welcomeText")}</p>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className={`input-group-text  bg-warning ${emailError ? "text-danger" : "text-dark"}`} id="basic-addon1"><FaEnvelope /></span>
                    </div>
                    <Field placeholder={t("shared.enterEmail")} className="form-control" id="inputError" type="email" name="email" onChange={handleChange} />
                    <div className="input-border" id="email-input-border" />
                </div>
                {emailError ? <div className="alert alert-danger mb-2">{emailError}</div> : <div className="mb-3" />}

                <div className="input-group mb-4">
                    <div className="input-group-prepend">
                        <span className={`input-group-text  bg-warning ${passwordError ? "text-danger" : "text-dark"}`} id="basic-addon1"><FaKey /></span>
                    </div>
                    <Field placeholder={t("shared.enterPassword")} className="form-control" type="password" name="password" onChange={handleChange} required/>
                    <div className="input-border"/>
                </div>
                {passwordError ? <div className="alert alert-danger mb-2">{passwordError}</div> : <div className="mb-3" />}

                <div className="input-group mb-4">
                <div className="input-group-prepend">
                        <span className={`input-group-text  bg-warning ${passwordConfirmationError ? "text-danger" : "text-dark"}`} id="basic-addon1"><FaCheck /></span>
                    </div>
                    <Field placeholder={t("shared.reWritePassword")} className="form-control" type="password" name="passwordConfirmation" onChange={handleChange} required/>
                    <div className="input-border"/>
                </div>
                {passwordConfirmationError ? <div className="alert alert-danger mb-2">{passwordConfirmationError}</div> : <div className="mb-3" />}

                <div>
                    <NavLink className="note" to="/signin">{t("signup.alreadyCustomer")}</NavLink>
                </div>
                <div className="text-center">
                    <input className="btn btn-warning" type="submit" value={t("signup.name")} />
                </div>
            </Form>
        </div>
    );
};

const SignUP = withFormik({
    mapPropsToValues(props) {
      return {
        email: "",
        password: "",
        passwordConfirmation: ""
      }
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("notValid").required("required"),
      password: Yup.string().min(8, "tooShort").required("required").matches(/^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,'passwordAllowedCharacters'),
      passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'passwordNotMatch').required("required")
    }),
    handleSubmit(values) {
    //   SignInService(values.email, values.password)
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err))
    },
    handleChange(value) {
      console.log(value)
    }
})(SignUpForm);
  
export default SignUP;
