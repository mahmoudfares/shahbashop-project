import axios from "axios";

export function addImage(image){
    let url = `images/${image.productId}`;
    const formData = new FormData();
    formData.append("file", image.file[0]);
    return axios.post(url, formData, {headers: {"Content-Type": "multipart/form-data"}});
}

export function deleteImage(imageId){
    let url = `images/${imageId}`;
    return axios.delete(url);
}

export function updateIsMain(imageId, productId){
    let url = `images/${imageId}/products/${productId}`;
    return axios.put(url);
}