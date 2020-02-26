import actionTypes from "./types";
import {getProducts, postProduct, removeProduct, editProduct, getProductsPerCategory} from "../services/productServices";

export function fetchProducts(queryParams) {
    return(dispatch) => 
        getProducts(queryParams)
            .then(res => {
                return dispatch(
            {
                type: actionTypes.GET_PRODUCTS,
                payload: res.data,
                pagination: JSON.parse(res.headers["pagination"])
            }
        )})
        .catch(err=>console.log(err));
}

export function getProductsPerCategoryAction(categoryId) {
    return (dispatch) =>
        getProductsPerCategory(categoryId)
            .then(res => dispatch(
                    {
                        type: actionTypes.GET_PRODUCTS,
                        payload: res.data,
                    }
                )
            )
        .catch(err=>console.log(err));

}

export function addProduct(product){
    return(dispatch) =>
        postProduct(product)
        .then(res=>dispatch(
            {
                type: actionTypes.ADD_PRODUCT,
                payload: res.data,
            }
        ))
        .catch(err=>console.log(err));
}

export function deleteProduct(productId){
    return(dispatch) =>
        removeProduct(productId)
        .then(res => dispatch(
            {
                type: actionTypes.DELETE_PRODUCT,
                payload: productId
            }
        ))
}

export function updateProduct(product){
    return(dispatch) =>{
        editProduct(product)
        .then(res => dispatch(
            {
                type: actionTypes.UPDATE_PRODUCT,
                payload: product
            }
        ));
    }
}

