import React, { Component } from "react";
import { connect } from "react-redux";
import * as ProductActionCreators from "../../../actions/productAction";
import * as CategoryActionCreator from "../../../actions/categoryAction";
import {bindActionCreators} from "redux";
import "./products.scss";
import AddProductForm from "./AddProductForm";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import {NavLink} from "react-router-dom";


class Products extends Component {
  state = {showForm: false};

  componentDidMount(){
    this.props.fetchProducts();
    this.props.getCategoriesAction();
  }

  onShowFormButtonClick = () => {
    this.setState({showForm: !this.state.showForm})
  }

  addProduct = (product) =>{
    this.props.addProduct(product);
  }

  deleteItem = (productId) =>{
    this.props.deleteProduct(productId)
  }

  updateProduct = (product) =>{
    this.props.updateProduct(product);
  }
  
  render() {
    const {products} = this.props;
    return (
    <>
      <div>
        <h1>Products</h1>
      </div>
      <div className="add-form-container col-lg-12">
        <button className="btn btn-primary" onClick={this.onShowFormButtonClick}>AddProduct</button>
        {this.state.showForm ?  <AddProductForm categories={this.props.categories} submit={this.addProduct}></AddProductForm> : ""}
      </div>
      <div className="col-log-12">

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
          {products.map((product, index) => (<tr key={index + 1}>
          <th scope="row">{index + 1}</th>
              <td>
              <NavLink to={`/admin/dashboard/products/${product.id}`}><FaEdit /></NavLink> 
              {product.name}
              </td>
              <td>{product.category.name}</td>
            <td>{product.price}</td>
            <DeleteConfirmationModal submit={()=>this.deleteItem(product.id)} className="success" buttonLabel={<FaTrashAlt />}></DeleteConfirmationModal>
          </tr>))}
        </tbody>
</table>
</div>

      
</>
      );
  }
}

const mapStateToProps = state => ({
  products: state.products,
  categories: state.categories,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({...ProductActionCreators, ...CategoryActionCreator}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Products);
