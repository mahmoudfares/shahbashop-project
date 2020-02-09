import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { FaPen, FaTimes } from "react-icons/fa";

const EditCategoryForm = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const {
        category,
        submit
    } = props;

    const onSubmit = data => {
        data.id = category.id;
        submit(data);
        toggle();
    }
    const formErrors = {
        name: {},
    };

    

    const [showForm, setShowForm] = useState(false);

    const toggle = () => setShowForm(!showForm);

    return(
        <>
            <button onClick={toggle} className="btn btn-primary">{showForm ? <FaTimes></FaTimes> : <FaPen></FaPen>}</button>
            &nbsp;
            {showForm 
            ? 
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                <label htmlFor="name">Name</label>
                <input placeholder="Enter name" defaultValue={category.name} className="form-control"  type="text" name="name" ref={register({ required: true, minLength: 4 })} />
                {errors.name && formErrors.name.message}
                </div> 
                <button className="btn btn-success" type="submit">Update</button>
            </form>
            : 
            category.name
            }
           
        </>
    )
};

export default EditCategoryForm;