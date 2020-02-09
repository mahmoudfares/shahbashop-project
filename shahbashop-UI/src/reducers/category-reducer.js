import actionTypes from "../actions/types";
let newState = [];
export default function(state = [], action) {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES:
      state = action.payload;
      break;
    case actionTypes.UPDATE_CATEGORY:
      newState = [...state];
      newState = newState.map(cat => {

        if(cat.id === action.payload.id){
          cat.name = action.payload.name;
        }
        return cat
      });

      state = newState;
      break;
    case actionTypes.ADD_CATEGORY:
        newState = [...state];
        newState.push(action.payload);
        state = newState;
        break;
    default:
      return state;
  }
  return state;
}