import React, {useState} from "react";
import "./signUp.scss";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { FaEnvelope,FaKey,FaCheck } from "react-icons/fa";




export default function SignUp() {
    const { t } = useTranslation();

    const [emailErrors, setEmailErrors] = useState("");
    const [passwordErrors, setPasswordErrors] = useState("");
    const [passwordConfirmErrors, setPasswordConfirmErrors] = useState("");

    
    const onSubmit = (event) => {
        console.log(event)
        event.preventDefault();
    }
    
    const onChange = (e) => {
        let { name, value } = e.target;
        if (name = "email") {
            validateEmail(value);
            return;
        }
    }

    const validateEmail = (email) => {
        if (email === "") setEmailErrors("email is required");
        else if (email.length < 5) setEmailErrors("email must be larger then 5 characters")
        else setEmailErrors("");
    }

    const validatePassword = (password) => {
        if (password === "") setEmailErrors("email is required");
        else if (password.length < 5) setEmailErrors("email must be larger then 5 characters")
        else setEmailErrors("");
    }

    const validatePasswordConfirm = (confirmPassword) => {
        if (confirmPassword === "") setEmailErrors("email is required");
        else if (confirmPassword.length < 5) setEmailErrors("email must be larger then 5 characters")
        else setEmailErrors("");
    }

    return (
        <div className="col-lg-12 register bg-warning">
            <form className="col-lg-10 register-form bg-white" onSubmit={onSubmit}>
              <img className="logo" alt="logo" src={require(`../../images/White-square.jpg`)} />
                <h1 className="text-center title">{t("signup.name")}</h1>
                <p>{t("signup.welcomeText")}</p>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text  bg-warning text-dark" id="basic-addon1"><FaEnvelope /></span>
                    </div>
                    <input placeholder={t("shared.enterEmail")} className="form-control" id="inputError" type="email" name="email" onChange={onChange} required/>
                    <div className="input-border" id="email-input-border" />
                </div>
                {emailErrors ? <div className="alert alert-danger mb-2">{emailErrors}</div> : <div className="mb-3" />}

                <div className="input-group mb-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text  bg-warning text-dark" id="basic-addon1"><FaKey /></span>
                    </div>
                    <input placeholder={t("shared.enterPassword")} className="form-control" type="password" name="password" onChange={onChange} required/>
                    <div className="input-border"/>
                </div>
                <div className="input-group mb-4">
                <div className="input-group-prepend">
                        <span className="input-group-text bg-warning text-dark" id="basic-addon1"><FaCheck /></span>
                    </div>
                    <input placeholder={t("shared.reWritePassword")} className="form-control" type="password" name="password" onChange={onChange} required/>
                    <div className="input-border"/>
                </div>
                <div>
                    <NavLink className="note" to="/signin">{t("signup.alreadyCustomer")}</NavLink>
                </div>
                <div className="text-center">
                    <input className="btn btn-warning" type="submit" value={t("signup.name")} />
                </div>
            </form>
        </div>
    );
};

