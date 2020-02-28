import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getProduct} from "../../../../services/productServices";
import * as imageServices from "../../../../services/imageServices";
import UpdateProductForm from "./UpdateProductForm";
import {getCategoriesAction} from "../../../../actions/categoryAction";
import {updateProduct} from "../../../../actions/productAction";
import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from 'react-image-gallery';
import MyDropZone from "./MyDropZone";
import "./product.scss";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Product extends Component{
    state = {product: {images: null}, disableButtons: true};
    currentIndex = 0; 

    componentDidMount(){
        var {id} = this.props.match.params;

        if(id !== null){
            getProduct(id)
            .then(res => {
                res.data.images = this.setMainFirst(res.data.images);
                this.setState({
                   product : res.data
                });
            })
            .catch(err => NotificationManager.error("something went wrong" + err));
        }
        if(this.props.categories.length === 0){
            this.props.getCategoriesAction();
        }
    }

    updateProduct = (product) =>{
        product.id = this.state.product.id;
        this.props.updateProduct(product);
    }

    imagesForGallery = (productImages) => productImages.map(productImage => {
           return {original: productImage.url, thumbnail: productImage.url}
        });

    onSlid = (currentIndex) =>{
        this.currentIndex = currentIndex; 
        this.disableButtons();
    }

    showImageGallery = (productImages) =>{
        if(productImages && productImages.length > 0){
            return <ImageGallery showPlayButton={false} onSlide={this.onSlid} items={this.imagesForGallery(productImages)} />;
        }
    }

    disableButtons = () => {
        if(this.areProductImagesAvailable()){
            var newState = {...this.state};
            newState.disableButtons = this.currentImage().isMain;
            this.setState({...newState});
        }
    }

    areProductImagesAvailable = () => this.state.product.images !== null;

    currentImage = () => this.state.product.images[this.currentIndex];

    handleImageAdd = (file) => {
        const image = {productId : this.state.product.id, file : file}
        imageServices.addImage(image)
        .then(res => {
            let newState = {...this.state};
            newState.product.images.push(res.data);
            this.setState({...newState})
            NotificationManager.success('Image has been added')})
        .catch(err => NotificationManager.error("something went wrong" + err))
    }

    deleteImage = () => {
        const imageId = this.state.product.images[this.currentIndex].id;
        imageServices.deleteImage(imageId)
        .then(res => {
            let newState = {...this.state};
            newState.product.images = newState.product.images.filter(image => image.id !== imageId);
            this.setState({...newState})
            NotificationManager.success('Image has been deleted')})
        .catch(err => NotificationManager.error("something went wrong" + err));
    };

    setImageMain = () => {
        imageServices.updateIsMain(this.currentImage().id, this.currentProductId())
        .then(res =>{
                let newState = {...this.state};
                newState.product.images = this.state.product.images.map(image => {return {...image, isMain: false}});
                newState.product.images[this.currentIndex].isMain = true;
                newState.product.images = this.setMainFirst(this.state.product.images);
                newState.disableButtons = true;
                this.setState({...newState});
                NotificationManager.success('Image has been updated as main image');
            })
        .catch(err => NotificationManager.error("something went wrong" + err));
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

    addClassDisabled = (enabledClassName) => {
        if(this.state.disableButtons)
            return `${enabledClassName} disabled`;

        return enabledClassName;
    }

    currentProductId = () => this.state.product.id;

    render(){
        return(
            <>
            <div className="col-sm-12">
            <h1>hello world</h1>
            <NotificationContainer></NotificationContainer>
            </div>
            <div className="image-gallery-container col-lg-6">
            <button className={this.addClassDisabled("btn btn-danger")} disabled={this.state.disableButtons} onClick={this.deleteImage}>Delete</button>
            <button className={this.addClassDisabled("btn btn-primary")} disabled={this.state.disableButtons} onClick={this.setImageMain}>Set as main</button>
                {this.showImageGallery(this.state.product.images)}
            </div>
            <div className="col-lg-6 drop-zone-container">
                <MyDropZone submit={this.handleImageAdd}></MyDropZone>
            </div>
            <div className="col-sm-12">
                {this.state.product ? <UpdateProductForm product={this.state.product} categories={this.props.categories} submit={this.updateProduct}/> : "" } 
            </div>
            </>
        );
    }
}

const mapStateToProps = state =>({
    categories: state.categories,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({getCategoriesAction, updateProduct},dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Product);