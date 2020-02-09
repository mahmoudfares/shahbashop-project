import axios from "axios";

export function getCategories(){
  let url = "/categories";
  return axios.get(url);
}

export function postCategory(data){
  let url = "/categories";
  return axios.post(url, data);
}

export function updateCategory(data){
  let url = `/categories/${data.id}`;
  return axios.put(url, data);
}

// export function deleteCategory(categoryId){
//   let url = `/categories/${categoryId}`;
//   return axios.delete(url);
// }