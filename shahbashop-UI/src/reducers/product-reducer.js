import actionTypes from "../actions/types";
let newState = [];

export default function(state = [], action) {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS:
      state = action.payload;
      break;
    case actionTypes.ADD_PRODUCT:
      newState = [...state];
      newState.push(action.payload);
      state = newState;
      break;
    case actionTypes.DELETE_PRODUCT:
      newState = [...state];
      newState = newState.filter(x =>  x.id !== action.payload);
      state = newState;
      break;
    default:
      return state;
  }
  return state;
}