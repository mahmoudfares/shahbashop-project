import actionTypes from "./types";
import {getCategories, postCategory, updateCategory} from "../services/categoryServices";

export function getCategoriesAction(){
    return (dispatch) => 
        getCategories()
        .then(res => dispatch(
            {
                type: actionTypes.GET_CATEGORIES,
                payload: res.data,
            }
        ))
        .catch(err=>console.log(err));
}

export function addCategoryAction(data){
    return (dispatch) =>
        postCategory(data)
        .then(res => dispatch(
            {
                type: actionTypes.ADD_CATEGORY,
                payload: res.data
            }
        ))
        .catch(err => console.log(err));
}

// export function deleteCategoryAction(categoryId){
//     return (dispatch) => 
//         deleteCategory(categoryId)
//         .then(res => dispatch(
//             {
//                 type: actionTypes.DELETE_CATEGORY,
//                 payload: categoryId
//             }
//         )) 
//         .catch(err => console.log(err))
// }

export function updateCategoryAction(category){
    return (dispatch) => 
        updateCategory(category)
        .then(res => dispatch(
            {
                type: actionTypes.UPDATE_CATEGORY,
                payload: category
            }
        ))
        .catch(err => console.log(err))
}
