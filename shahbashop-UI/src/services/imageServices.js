import axios from "axios";
import { checkUserToken } from "../utils/cookies";


export function addImage(image){
    let url = `images/${image.productId}`;
    const formData = new FormData();
    formData.append("file", image.file[0]);
    return axios.post(url, formData, {headers: {"Content-Type": "multipart/form-data", "Authorization": `Bearer ${checkUserToken()}`}});
}

export function deleteImage(imageId){
    let url = `images/${imageId}`;
    return axios.delete(url, {headers: {"Authorization": `Bearer ${checkUserToken()}`}});
}

export function updateIsMain(imageId, productId){
    let url = `images/${imageId}/products/${productId}`;
    return axios.put(url);
}