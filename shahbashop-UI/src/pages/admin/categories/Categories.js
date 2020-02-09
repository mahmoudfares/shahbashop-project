import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getCategoriesAction, addCategoryAction, updateCategoryAction} from "../../../actions/categoryAction";
import AddCategoryForm from "./AddCategoryForm";
import EditCategoryForm from "./EditCategoryForm";

class Categories extends Component{

    state = {showForm: false};

    componentDidMount(){
      if(this.props.categories.length === 0){
        this.props.getCategoriesAction();
      }
    }
    
    addCategory = (data) => {
      if (data.parentId === ""){
        data = {name: data.name}
      }
      this.props.addCategoryAction(data);
    }

    editCategory = (data) =>{
      this.props.updateCategoryAction(data);
    }

    render(){
        const {categories} = this.props
        return(
            <div>
              <h1>Hello categories</h1>
              <AddCategoryForm categories={categories} submit={this.addCategory}></AddCategoryForm>
              <table className="table table-striped table-dark table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, index) => (
                    <tr key={index + 1}>
                      <th scope="row">{index + 1}</th>
                        <td>
                          <EditCategoryForm category={category} submit={this.editCategory}></EditCategoryForm>
                        </td>
                        <td>{category.category}</td>
                      <td>{category.price}</td>
                    </tr>))}
                  </tbody>
              </table>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    categories: state.categories,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({getCategoriesAction, addCategoryAction, updateCategoryAction},dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Categories);