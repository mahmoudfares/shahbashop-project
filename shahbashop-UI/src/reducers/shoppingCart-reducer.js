import actionTypes from "../actions/types";
let newState = [];
let indexOfExistingItem;

export default function(state = [], action) {
  switch (action.type) {
    case actionTypes.DELETE_ITEM_SHOPPING_CART:
      newState = [...state];
      indexOfExistingItem = getIndexOfExistingItem(newState,action.payload.id);
      if(newState[indexOfExistingItem].amount === 1){
        newState = newState.filter(item => item.id !== action.payload.id);
      }else{
        newState[indexOfExistingItem].amount--; 
      }
      state = [...newState];
      saveState(state);
      break;
    case actionTypes.ADD_ITEM_SHOPPING_CART:
      newState = [...state];
      indexOfExistingItem = getIndexOfExistingItem(newState,action.payload.id);
      if(indexOfExistingItem !== -1){
          newState[indexOfExistingItem].amount++;        
      }else{
        action.payload.amount = 1;
        newState.push(action.payload);
      }
      state = [...newState];
      saveState(state);
      break;
    default:
      return state = loadState();
  }
  return state;
}

const loadState = () =>{
  try{
    const serializedState = localStorage.getItem("shoppingCart")
    if(serializedState === null){
      return []
    }
    return JSON.parse(serializedState);
  }catch(err){
    return null;
  }
}

const saveState = (state)=>{
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem("shoppingCart", serializedState);
  }catch{

  }
}

const getIndexOfExistingItem = (arr, itemId) => {
    for(var i = 0; i < arr.length; i++) {
      if(arr[i].id === itemId) {
        return i;
      }
  }
  return -1;
}

