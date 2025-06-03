export const ADD = (item) => ({
  type: "ADD_TO_CART",
  payload: item,
});

export const TOTAL = () => ({
  type: "TOTAL_CART",
  payload: "",
});

export const TOTAL_SALE = () => ({
  type: "TOTAL_CART_SALE",
  payload: "",
});

export const REMOVE = (item) => ({
  type: "REMOVE_FROM_CART",
  payload: item,
});

export const CLEAR = () => ({
  type: "CLEAR_CART",
  payload: "",
});

export const SET_CART_FROM_API = (cartData) => ({
  type: "SET_CART_FROM_API",
  payload: cartData,
});
