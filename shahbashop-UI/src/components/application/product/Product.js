import React, {useState} from "react";
import {FaPlus, FaMinus} from "react-icons/fa";
import "./product.scss";
import {NavLink} from "react-router-dom";
import { useTranslation } from "react-i18next";

const Product = (props) => {
    const {t} = useTranslation();
    const {product, skipMaxLimit, add, remove, type} = props;

    const initialTotalOrdered = () => {
        if(product.amount){
            return product.amount >= product.maxToOrder ? product.maxToOrder : product.amount;
        }
        return 0;
    }

    const [totalOrdered, setTotalOrdered] = useState(initialTotalOrdered());
    
    const mainImage = product.images.filter(image => image.isMain)[0];

    const increaseOrderAmount = () =>  {
        if(totalOrdered === product.maxToOrder){
            skipMaxLimit(product.maxToOrder);
            return;
        }
        if(totalOrdered < product.maxToOrder) {
            setTotalOrdered(totalOrdered +1)
            add(product);
        }
    }


    const decreaseOrderAmount = () => {
        if(totalOrdered > 0) {
        setTotalOrdered(totalOrdered -1);
        remove(product);
    }}

    const PriceWithCents = (props) => {
        let pointIndex = props.price.indexOf(".");
        
        if(pointIndex === -1)
            return  <span>{props.price}</span>

        let priceEuros = props.price.slice(0, pointIndex);
        let priceCents = props.price.slice(pointIndex +1);
        return <span>{priceEuros}<sup>{priceCents}</sup></span>
    }
    const choseTypeClass = () => type === "list" ? "list-item list-group-item" : "product-card";
    return (
    <div className={choseTypeClass()}>
        <div className="image-container ">
            <NavLink to={`/products/${product.id}`}>
                <img alt={mainImage.id} src={mainImage.url}></img>
            </NavLink>
        </div>
        <div className="product-information">
            <h6>{product.name}</h6>
            <div className="price">
                {type === "list" 
                    ? 
                    <p className="total-price">
                        {product.amount} {t("shoppingCart.items")} X 
                        <PriceWithCents price={product.price}></PriceWithCents> = 
                        <PriceWithCents price={`${product.totalPrice.toFixed(2)}`}></PriceWithCents>
                    </p> 
                    : 
                    <PriceWithCents price={product.price}></PriceWithCents>
                }
            </div>
        </div>
        <div className={type === "list" ? "align-self-center order-operating-container" : "order-operating-container"} >
            <button className="button" id="decrease" onClick={decreaseOrderAmount}><FaMinus></FaMinus></button>
            <p className="total-ordered">{totalOrdered}</p>
            <button className="button" id="increase" onClick={increaseOrderAmount}><FaPlus></FaPlus></button>
        </div>
    </div>    
    )
}

export default Product;