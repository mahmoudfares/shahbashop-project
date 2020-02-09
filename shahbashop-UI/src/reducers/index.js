import { combineReducers } from "redux";
import UserReducer from "./reducer-user";
import ProductReducer from "./product-reducer";
import CategoryReducer from "./category-reducer";
import shoppingCartReduce from "./shoppingCart-reducer";
const allReducer = combineReducers({
  products: ProductReducer,
  user: UserReducer,
  categories: CategoryReducer,
  shoppingCart: shoppingCartReduce
});

export default allReducer;
