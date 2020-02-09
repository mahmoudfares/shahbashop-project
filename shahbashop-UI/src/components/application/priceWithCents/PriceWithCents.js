import React from "react";

function PriceWithCents(props){
    const {price} = props;
    if(price){
        let pointIndex = price.indexOf(".");
        if(pointIndex === -1)
            return  <span>{price}</span>
        
            let priceEuros = price.slice(0, pointIndex);
            let priceCents = price.slice(pointIndex +1);
            return <span>{priceEuros}.<sup>{priceCents}</sup></span>
    }else{
        return "";
    }
    

}

export default PriceWithCents;