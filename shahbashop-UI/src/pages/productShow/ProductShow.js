import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getProduct} from "../../services/productServices";
import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from 'react-image-gallery';
import 'react-notifications/lib/notifications.css';
import {FaPlus, FaMinus, FaSadTear, FaSmile, FaInfoCircle} from "react-icons/fa";
import "./productShow.scss";
import PriceWithCents from "../../components/application/priceWithCents/PriceWithCents";
import {NavLink} from "react-router-dom";
import {addItem, deleteItem} from "../../actions/shoppingCartAction";
import { store } from 'react-notifications-component';
import {options} from "../../helpers/notificationOptions";

class ProductShow extends Component{
    state = {product: {images: null, category:{}}, totalOrdered: 0};

    initialTotalOrdered = () => {
        if(this.state.product.id && this.props.shoppingCart.length > 0){
            // this.state.product.amount >= this.state.product.maxToOrder ? this.state.product.maxToOrder : this.state.product.amount;
            this.props.shoppingCart.forEach(element => {
                if(element.id === this.state.product.id){
                    element.amount >= this.state.product.maxToOrder 
                    ? this.setState({...this.state, totalOrdered: this.state.product.maxToOrder}) 
                    : this.setState({...this.state, totalOrdered: element.amount})
                }
            })
        }
    }

    componentDidMount(){
        var {id} = this.props.match.params;

        if(id !== null){
            getProduct(id)
            .then(res => {
                res.data.images = this.setMainFirst(res.data.images);
                this.setState({
                    product : res.data
                });
                this.initialTotalOrdered();
            })
            .catch(err => console.log(err));
        }
    }

    imagesForGallery = (productImages) => productImages.map(productImage => {
           return {original: productImage.url, thumbnail: productImage.url}
        });

    showImageGallery = (productImages) =>{
        if(productImages && productImages.length > 0){
            return <ImageGallery showPlayButton={false} onSlide={this.onSlid} items={this.imagesForGallery(productImages)} />;
        }
    }

    setMainFirst = (arr) => {
        let newArr = [];
        arr.forEach(image => {
            if(image.isMain){
                newArr.unshift(image);
                return;
            }
            newArr.push(image)
        });

        return newArr;
    }

    increaseOrderAmount = () =>  {
        if(this.state.totalOrdered === this.state.product.maxToOrder){
            store.addNotification({
                ...options,
                type: "info",
                message: <div><FaInfoCircle className="notification-icon"></FaInfoCircle> You can't order more than {this.state.product.maxToOrder} items</div>,
            });
            return;
        }
        if(this.state.totalOrdered < this.state.product.maxToOrder) {
            let newTotalOrdered = this.state.totalOrdered + 1;
            this.setState({...this.state, totalOrdered: newTotalOrdered});
            store.addNotification({
                ...options,
                type: "success",
                message: <div><FaSmile className="notification-icon"></FaSmile> {this.state.product.name} have been added to your shopping cart</div>,
              });
            this.props.addItem(this.state.product);
        }
    }


    decreaseOrderAmount = () => {
        if(this.state.totalOrdered > 0) {
            let newTotalOrdered = this.state.totalOrdered -1;
            this.setState({...this.state, totalOrdered: newTotalOrdered})
            store.addNotification({
                ...options,
                type: "warning",
                message: <div><FaSadTear className="notification-icon"></FaSadTear> {this.state.product.name} have been removed from your shopping cart</div>,
              });
            this.props.deleteItem(this.state.product); 
        }
    }

    render(){
        const {product} = this.state;
        return(
            <>
                <div className="col-lg-1"></div>
                <div className="image-gallery-container col-lg-3 col-md-6 col-sm-12">
                    {this.showImageGallery(product.images)}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-9 ">
                    <div>
                        <h1>{product.name}</h1>
                        <div className="price-show-product"><h4><PriceWithCents price={product.price}></PriceWithCents></h4></div>
                    </div>
                    <div className="custom-btn-group">
                        <button className="button decrease" onClick={this.decreaseOrderAmount}>Remove <FaMinus></FaMinus></button>
                        <p className="total-ordered-show-product">{this.state.totalOrdered}</p>
                        <button className="button increase" onClick={this.increaseOrderAmount}>Add <FaPlus></FaPlus></button>
                    </div>
                    <div>
                        <p>{product.description}</p>
                    </div>
                    <div>
                        See more of: 
                        <NavLink to={`/search?categoryId=${product.category.id}`}>{product.category.name}</NavLink>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state =>({
    shoppingCart: state.shoppingCart,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({addItem, deleteItem},dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductShow);