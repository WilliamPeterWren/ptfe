export const ADD = (item) => ({
    type: 'ADD_TO_CART',
    payload: item
});

export const TOTAL = () => ({
    type: 'TOTAL_CART',
    payload: ''
});

export const REMOVE = (item) => ({
    type: 'REMOVE_FROM_CART', 
    payload: item
});

export const CLEAR = () => ({
    type: 'CLEAR_CART',
    payload: ''
});