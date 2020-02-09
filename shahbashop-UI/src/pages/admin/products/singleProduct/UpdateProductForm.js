import React from "react";
import { useForm } from "react-hook-form";

export default function UpdateProductForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => props.submit(data);
  const {product, categories} = props;
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
      <input placeholder="Enter name" className="form-control"  type="text" defaultValue={product.name} name="name" ref={register({ required: true, minLength: 4 })} />
      {errors.name && formErrors.name.message}
      </div>
      <div className="form-group">
      <label htmlFor="categoryId">category</label>
      <select className="form-control" type="text" defaultValue={product.id} name="categoryId" ref={register({ required: true })}>
        {categories ? categories.map(category => <option key={category.id} selected={product.categoryId} value={category.id} >{category.name}</option> ): ""}
      </select>
      {errors.categoryId && formErrors.category.message}
      </div>
      <div className="form-group">
      <label htmlFor="price">price</label>
      <input className="form-control" defaultValue={product.price} type="number" step=".01" name="price" ref={register({ required: true })} />
      {errors.price && formErrors.price.message}
      </div>
      <div>
      <input className="btn btn-primary" type="submit" value="Update"/>
      </div>
    </form>
  );
}
