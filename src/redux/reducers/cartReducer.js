import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initCart = {
  carts: [],
  amountItem: 0,
  totalAmount: 0,
  totalSale: 0,
  totalDiscount: 0,
  countCart: 0,
};

const cartReducer = (state = initCart, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const productToAdd = action.payload.product;
      const quantityToAdd = action.payload.quantity;

      let updatedCarts = [...state.carts];
      let newAmountItem = state.amountItem;

      const existingSellerIndex = updatedCarts.findIndex(
        (seller) => seller.sellerId === productToAdd.sellerId
      );

      if (existingSellerIndex !== -1) {
        const seller = { ...updatedCarts[existingSellerIndex] };
        const existingProductIndex = seller.itemResponses.findIndex(
          (item) => item.productId === productToAdd.id
        );

        if (existingProductIndex !== -1) {
          seller.itemResponses[existingProductIndex].quantity += quantityToAdd;

          toast.info(`Update quantity ${productToAdd.name}`, toastStyle());
        } else {
          seller.itemResponses.push({
            ...productToAdd,
            quantity: quantityToAdd,
          });
          newAmountItem++;
          toast.success(`Add ${productToAdd.name} to cart`, toastStyle());
        }

        updatedCarts[existingSellerIndex] = seller;
      } else {
        updatedCarts.push({
          sellerId: productToAdd.sellerId,
          sellerName: productToAdd.sellerName || "Unknown Seller",
          itemResponses: [{ ...productToAdd, quantity: quantityToAdd }],
        });
        newAmountItem++;
        toast.success(`Add ${productToAdd.name} to cart`, toastStyle());
      }

      const newTotalAmount = calculateTotalAmount(updatedCarts);
      const finalAmountItem = calculateItemCount(updatedCarts);

      return {
        ...state,
        carts: updatedCarts,
        amountItem: finalAmountItem,
        totalAmount: newTotalAmount,
      };
    }

    case "TOTAL_CART": {
      const total = state.carts.reduce((sum, seller) => {
        return (
          sum +
          seller.itemResponses.reduce((subSum, product) => {
            return subSum + product.price * product.quantity;
          }, 0)
        );
      }, 0);

      return {
        ...state,
        totalAmount: total,
      };
    }

    case "TOTAL_CART_SALE": {
      const total = state.carts.reduce((sum, seller) => {
        return (
          sum +
          seller.itemResponses.reduce((subSum, product) => {
            const price =
              product.salePrice > 0 ? product.salePrice : product.price;

            return subSum + price * product.quantity;
          }, 0)
        );
      }, 0);

      return {
        ...state,
        totalSale: total,
      };
    }

    case "TOTAL_CART_DISCOUNT": {
      const total = state.carts.reduce((sum, seller) => {
        return (
          sum +
          seller.itemResponses.reduce((subSum, product) => {
            return subSum + product.discount * product.quantity;
          }, 0)
        );
      }, 0);

      console.log(total);

      return {
        ...state,
        totalDiscount: total,
      };
    }

    case "COUNT_CART": {
      const count = state.carts.reduce(
        (sum, seller) => sum + seller.itemResponses.length,
        0
      );
      return {
        ...state,
        countCart: count,
      };
    }

    case "REMOVE_FROM_CART": {
      const { productId, sellerId } = action.payload;

      // toast.warning(`Warning! Delete ${productName} from cart`, toastStyle());
      // console.log(action.payload);

      const updatedCartsAfterRemoval = state.carts
        .map((seller) => {
          if (seller.sellerId === sellerId) {
            const updatedProducts = seller.itemResponses.filter(
              (p) => p.id !== productId
            );
            if (updatedProducts.length === 0) return null;
            return { ...seller, itemResponses: updatedProducts };
          }
          return seller;
        })
        .filter(Boolean);

      return {
        ...state,
        carts: updatedCartsAfterRemoval,
        amountItem: calculateItemCount(updatedCartsAfterRemoval),
        totalAmount: calculateTotalAmount(updatedCartsAfterRemoval),
        totalSale: calculateTotalSale(updatedCartsAfterRemoval),
      };
    }

    case "CLEAR_CART": {
      toast.warning("Warning! Delete ALL cart", toastStyle());
      return {
        ...state,
        carts: [],
        amountItem: 0,
        totalAmount: 0,
        totalSale: 0,
        countCart: 0,
      };
    }

    case "SET_CART_FROM_API": {
      const fetchedCartsTransformed = action.payload;

      // console.log("SET_CART_FROM_API payload:", fetchedCartsTransformed);

      const sortedCarts = fetchedCartsTransformed.map((seller) => ({
        ...seller,
        itemResponses: [...seller.itemResponses].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        ),
      }));

      const newTotalAmount = calculateTotalAmount(sortedCarts);
      const newAmountItem = calculateItemCount(sortedCarts);
      const newCountCart = sortedCarts.reduce(
        (sum, seller) => sum + seller.itemResponses.length,
        0
      );

      return {
        ...state,
        carts: sortedCarts,
        amountItem: newAmountItem,
        totalAmount: newTotalAmount,
        totalSale: calculateTotalSale(sortedCarts),
        countCart: newCountCart,
      };
    }

    default:
      return state;
  }
};

// Utility: Toast styling
const toastStyle = () => ({
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

// Utility: Total price calculation
const calculateTotalAmount = (carts) => {
  return carts?.reduce((sum, seller) => {
    return (
      sum +
      seller?.itemResponses?.reduce((subSum, product) => {
        return subSum + product.price * product.quantity;
      }, 0)
    );
  }, 0);
};

const calculateTotalSale = (carts) => {
  return carts?.reduce((sum, seller) => {
    return (
      sum +
      seller?.itemResponses?.reduce((subSum, product) => {
        const price = product.salePrice > 0 ? product.salePrice : product.price;
        return subSum + price * product.quantity;
      }, 0)
    );
  }, 0);
};

// Utility: Count all items (not total quantity)
const calculateItemCount = (carts) => {
  return carts.reduce((sum, seller) => sum + seller?.itemResponses?.length, 0);
};

export default cartReducer;
