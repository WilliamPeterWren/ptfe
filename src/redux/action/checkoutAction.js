export const ADD_CHECKOUT = (item) => ({
  type: "ADD_TO_CHECKOUT",
  payload: item,
});

export const TOTAL_CHECKOUT = () => ({
  type: "TOTAL_CHECKOUT",
  payload: "",
});

export const REMOVE_CHECKOUT = (item) => ({
  type: "REMOVE_FROM_CHECKOUT",
  payload: item,
});

export const CLEAR_CHECKOUT = () => ({
  type: "CLEAR_CHECKOUT",
  payload: "",
});
