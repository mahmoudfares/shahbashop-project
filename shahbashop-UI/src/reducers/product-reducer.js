import actionTypes from "../actions/types";
let newState = [];

export default function(state = {products:[], pagination: {}}, action) {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS:
      state.products = action.payload;
      state.pagination = action.pagination;
      break;
    case actionTypes.ADD_PRODUCT:
      newState = [...state];
      newState.products.push(action.payload);
      state = newState;
      break;
    case actionTypes.DELETE_PRODUCT:
      newState = [...state];
      newState = newState.products.filter(x =>  x.id !== action.payload);
      state = newState;
      break;
    default:
      return state;
  }
  return state;
}