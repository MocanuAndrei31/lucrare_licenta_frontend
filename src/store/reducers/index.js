import { combineReducers } from "redux";
import productsReducers from "./productsReducers";
import authReducers from "./authReducers";

export default combineReducers({
  products: productsReducers,
  auth: authReducers,
});
