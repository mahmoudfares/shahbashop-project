import React from "react";
import { useForm } from "react-hook-form";

export default function AddCategoryForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => props.submit(data);
  const formErrors = {
    name: {},
  };

  const validateForm = () => {
    if (errors.name) {
        formErrors.name.message = "Name is required"
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
      <select className="form-control" name="parentId" ref={register}>
          <option value="" key="no-parent">No parent</option>
          {props.categories.map(category => 
                <option key={category.id} value={category.id}>{category.name}</option>
            )}
      </select>
      </div>
      <input className="btn btn-primary" type="submit" value="add"/>
    </form>
  );
}
