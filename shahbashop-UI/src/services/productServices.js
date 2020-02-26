import axios from "axios";

export function getProducts(queryParams) {
  let queryString = Object.keys(queryParams).map(key => key + "=" + queryParams[key]).join("&");
  let url = `/products?${queryString}`;
  return axios.get(url);
}

export function getProductsPerCategory(categoryId){
  let url = `/products/category/${categoryId}`
  return axios.get(url);
}

export function postProduct(product){
  let url = "/products";
  return axios.post(url, product); 
}

export function removeProduct(id){
  let url = `/products/${id}`;
  return axios.delete(url);
}

export function editProduct(product){
  let url = `/products/${product.id}`;
  return axios.put(url, product);
}

export function getProduct(id){
  let url = `/products/${id}`;
  return axios.get(url);
}