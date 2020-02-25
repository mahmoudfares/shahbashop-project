import React from "react";
import {connect} from "react-redux";
import Product from "../../components/application/product/Product";
import {addItem, deleteItem} from "../../actions/shoppingCartAction";
import {bindActionCreators} from "redux";
import { Alert } from 'reactstrap';
import { store } from 'react-notifications-component';
import {options} from "../../helpers/notificationOptions";
import {FaSadTear, FaSmile, FaInfoCircle} from "react-icons/fa";
import compose from 'compose-function';
import { withTranslation  } from 'react-i18next';
import PriceWithCents from "../../components/application/priceWithCents/PriceWithCents";


class ShoppingCart extends React.Component {

  skipMaxLimit = (maxAmount) =>{
    store.addNotification({
      ...options,
      type: "info",
      message: <div><FaInfoCircle className="notification-icon"></FaInfoCircle> You can't add more than {maxAmount} items</div>,
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

  totalPrice = () => {
    let toReturnPrice = 0;
    this.props.shoppingCart.forEach(element => {
      toReturnPrice += element.totalPrice
    });
    return toReturnPrice;
  }

  render(){
    const {t} = this.props;
      return (
        <>
            <div className="col-lg-2" />
            <div className="col-lg-8 col-sm-11 container">
              <h1 className="">{t("shoppingCart.name")}</h1>
              <div className="row list-group" style={{"maxWidth": "98%", margin: "10px auto"}}>
              {this.props.shoppingCart.length === 0 ? 
                <Alert className="col-sm-12" color="info" fade={true}>Your shopping cart is empty</Alert> : 
                this.props.shoppingCart.map(product => <Product remove={this.removeFromShoppingCart} add={this.addToShoppingCart} skipMaxLimit={this.skipMaxLimit} type="list" key={product.id} product={product}>{product.name}</Product>
                )
              }
              <p>{t("shoppingCart.totalPrice")}: <PriceWithCents price={this.totalPrice().toFixed(2)}></PriceWithCents></p>
              </div>
              {
                this.props.shoppingCart.length > 0 
                ? 
                <button className="btn btn-success float-right">{t("shoppingCart.order")}</button> 
                : ""
              }
            </div>
            <div className="col-lg-2" />
          </>
    )
    };
  } 

  const mapStateToProps = (state) => ({
    shoppingCart: state.shoppingCart,
  });

  const mapDispatchToProps = (dispatch) => bindActionCreators({addItem, deleteItem}, dispatch);
  
  export default compose(withTranslation() ,connect(mapStateToProps, mapDispatchToProps))(ShoppingCart);