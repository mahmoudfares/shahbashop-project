import React, { Component } from "react";
import { connect } from "react-redux";
import {getProductsPerCategoryAction} from "../../actions/productAction";
import {getCategoriesAction} from "../../actions/categoryAction";
import {addItem, deleteItem} from "../../actions/shoppingCartAction";
import {bindActionCreators} from "redux";
import Product from "../../components/application/product/Product";
import "./search.scss";
import { store } from 'react-notifications-component';
import {options} from "../../helpers/notificationOptions";
import { FaSadTear, FaSmile, FaInfoCircle } from "react-icons/fa";
import queryString from "query-string";

export class CategoryProducts extends Component {

  componentDidMount() {
    var queryValues = queryString.parse(this.props.location.search);

    this.props.getProductsPerCategoryAction(queryValues.categoryId);
    this.props.getCategoriesAction();
    this.addAmountIfNeeded();
  }

  addAmountIfNeeded = () =>{
    if(this.props.products.length >= 1 && this.props.shoppingCart.length >= 1){
      this.props.shoppingCart.forEach(element => 
         { 
           this.props.products.forEach(product => 
            {
              if(element.id === product.id){
                product.amount = element.amount;
              }
            }
            )
        })
    }
  }

  skipMaxLimit = (maxAmount) =>{
    store.addNotification({
      ...options,
      type: "info",
      message: <div><FaInfoCircle className="notification-icon"></FaInfoCircle> You can't order more than {maxAmount} items</div>,
    });
  }

  addToShoppingCart = (product) =>{
    store.addNotification({
      ...options,
      type: "success",
      message: <div><FaSmile className="notification-icon"></FaSmile> {product.name} have been added to your shopping cart</div>,
    });

    this.props.addItem(product);
  }

  removeFromShoppingCart = (product) => {
    store.addNotification({
      ...options,
      type: "warning",
      message: <div><FaSadTear className="notification-icon"></FaSadTear> {product.name} have been removed from your shopping cart</div>,
    });

    this.props.deleteItem(product);
  }
  
  render() {
    this.addAmountIfNeeded();
    return (
      <div className="container">
        <div className="row">
            {this.props.products.map(product =>
            <div key={product.id}  className="col-lg-3 col-md-4 col-sm-6 product-container">
              <Product remove={this.removeFromShoppingCart} add={this.addToShoppingCart} skipMaxLimit={this.skipMaxLimit} product={product}>
              </Product>
            </div>)}
            </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  categories: state.categories,
  shoppingCart: state.shoppingCart,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({getProductsPerCategoryAction, getCategoriesAction, addItem, deleteItem}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProducts);
