import React from "react";
import { useForm } from "react-hook-form";

export default function AddProductForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => props.submit(data);
  const formErrors = {
    name: {},
    category: {},
    price: {},
  };

  const validateForm = () => {
    if (errors.name) {
        formErrors.name.message = "Name is required"
    }
    if (errors.price) {
        formErrors.price.message = "price is required"
    }
    if (errors.category) {
        formErrors.category.message = "category is required"
    }
  };

  validateForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
      <label htmlFor="name">Name</label>
      <input placeholder="Enter name" className="form-control"  type="text" name="name" ref={register({ required: true, minLength: 4 })} />
      {errors.name && formErrors.name.message}
      </div>
      <div className="form-group">
      <label htmlFor="categoryId">category</label>
      <select  className="form-control" name="categoryId" ref={register({ required: true })}>
        {props.categories.map(category => <optgroup key={category.id} label={category.name}>
            {category.children ? category.children.map(child => <option key={child.id} value={child.id}>{child.name}</option>) : ""}
          </optgroup> )}
      </select>
      {errors.categoryId && formErrors.category.message}
      </div>
      <div className="form-group">
      <label htmlFor="price">price</label>
      <input className="form-control" type="number" step=".01" name="price" ref={register({ required: true })} />
      {errors.price && formErrors.price.message}
      </div>
      <div>
      <input className="btn btn-primary" type="submit" value="add"/>
      </div>
    </form>
  );
}
