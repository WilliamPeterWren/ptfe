import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const initCart ={
    carts: [],
    amountItem: 0,
    totalAmount: 0
}

const cartReducer = (state = initCart, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':

            const existingItemIndex = state.carts.findIndex(item => {                
                return item[0].id === action.payload[0].id;
            });
          
                
            if (existingItemIndex !== -1) {
                // If item already exists, update its quantity
                const updatedCart = state.carts.map((item, index) => 
                    index === existingItemIndex ? { ...item, quantity: item.quantity + action.payload.amount } : item
                );

                toast.info(`Update quantity ${action.payload[0].name}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: {
                        top: "-50%",
                        transform: "translateY(50%)",
                        marginRight: "2%",
                        width: "fit-content",
                    },
                });
                return {
                    ...state,
                    carts: updatedCart,
                    totalAmount: state.totalAmount + action.payload.amount
                };
            } else {
                // Item not found, add it to the cart
                toast.success(`Add ${action.payload[0].name} to cart`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: {
                        top: "-50%",
                        transform: "translateY(50%)",
                        marginRight: "2%",
                        width: "fit-content",
                    },
                });
                
                return {
                    ...state,
                    carts: [...state.carts, { ...action.payload, quantity: action.payload.amount }],
                    amountItem: state.amountItem + 1,
                    totalAmount: state.totalAmount + action.payload.amount
                };
            }

        case 'TOTAL_CART':
            let total = 0;
            state.carts.forEach(item => {  

                if(item){                    
                    total += item[0].price * item.quantity;
                }
            });

            const newState = {
                ...state, 
                totalAmount: total
            }

            return newState;
         
        case 'REMOVE_FROM_CART':
            toast.warning(`Warning! Delete ${action.payload[0].name} from cart`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: {
                    top: "-50%",
                    transform: "translateY(50%)",
                    marginRight: "2%",
                    width: "fit-content",
                },
            });
            return {
                ...state,
                carts: state.carts.filter(item => {
                    return item[0].id !== action.payload[0].id
                }),
                amountItem: state.amountItem - 1,
                totalAmount: state.totalAmount - action.payload[0].price    

            }  
    
        case 'CLEAR_CART':
            toast.warning(`Warning! Delete ALL cart`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: {
                    top: "-50%",
                    transform: "translateY(50%)",
                    marginRight: "2%",
                    width: "fit-content",
                },
            });
            return {
                ...state,
                 carts: [],
                 amountItem: 0,
                 totalAmount: 0
            }

        default:
            return state;
    }
};

export default cartReducer;
