import React from "react";
import { useForm } from "react-hook-form";
import { LoginService } from "../../services/AuthService";
import { setToken } from "../../utils/cookies";

export default function Login(props) {
  const { register, handleSubmit, errors } = useForm();
  const formErrors = {
    email: {
      message: ""
    }
  };

  const validateForm = () => {
    if (errors.email) {
      errors.email.type === "required"
        ? (formErrors.email.message = "Email field is required")
        : (formErrors.email.message = "Email field min length is 2");
    }
  };

  const onSubmit = (data) => {
    LoginService(data.email, data.password)
      .then(res => {
        setToken(res.data.token);
        props.history.goBack();
      })
      .catch(err => console.log(err));
  }

  validateForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="col-lg-12">
      <div className="form-group">
      <label htmlFor="email">Email address</label>
      <input placeholder="Enter email" className="form-control"  type="email" name="email" ref={register({ required: true, minLength: 2 })} />
      {errors.email && formErrors.email.message}
      </div>
      <div className="form-group">
      <label htmlFor="password">Password</label>
      <input className="form-control" type="password" name="password" ref={register} />
      </div>
      <div>
      <input className="btn btn-primary" type="submit" />
      </div>
    </form>
  );
}
