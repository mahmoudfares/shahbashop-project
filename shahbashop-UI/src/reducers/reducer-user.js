import actionTypes from "../actions/types";
export default function(state = null, action) {
  switch (action.types) {
    case actionTypes.GET_USERS:
      state = action.payload;
      break;
      default:
      return state;
  }
  return state;
}
