import React from "react";
import { useForm } from "react-hook-form";

export default function Login(props) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => props.submit(data);
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

  validateForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
