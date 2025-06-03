import { createStore, combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";
import checkoutReducer from "./reducers/checkoutReducer";
const rootReducer = combineReducers({
  cart: cartReducer,
  checkout: checkoutReducer,
});
const store = createStore(rootReducer);

export default store;
