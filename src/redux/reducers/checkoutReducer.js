import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initCheckout = {
  checkouts: [],
  amountItem: 0,
  totalAmount: 0,
  countCheckout: 0,
};

const checkoutReducer = (state = initCheckout, action) => {
  switch (action.type) {
    case "ADD_TO_CHECKOUT": {
      const {
        productId,
        productName,
        variantId,
        variantName,
        slug,
        image,
        price,
        salePrice,
        quantity,
        discount,
        // sellerVoucherId,
        // shippingId,
      } = action.payload.item;

      const { sellerId, sellerUsername } = action.payload.seller;

      const productToAdd = {
        productId,
        productName,
        variantId,
        variantName,
        slug,
        image,
        price,
        salePrice,
        quantity,
        discount
        // sellerVoucherId,
        // shippingId,
      };

      let updatedCheckouts = [...state.checkouts];

      const existingSellerIndex = updatedCheckouts.findIndex(
        (seller) => seller.sellerId === sellerId
      );

      if (existingSellerIndex !== -1) {
        const seller = { ...updatedCheckouts[existingSellerIndex] };
        const existingProductIndex = seller.items.findIndex(
          (item) => item.productId === productId && item.variantId === variantId
        );

        if (existingProductIndex !== -1) {
          seller.items[existingProductIndex].quantity = quantity;
          toast.success(`Added ${productName} to checkout`, toastStyle());
        } else {
          seller.items.push(productToAdd);
          toast.success(`Added ${productName} to checkout`, toastStyle());
        }

        seller.updatedAt = new Date().toISOString();
        updatedCheckouts[existingSellerIndex] = seller;
      } else {
        updatedCheckouts.push({
          sellerId,
          sellerUsername,
          items: [productToAdd],
          updatedAt: new Date().toISOString(),
        });
        toast.success(`Added ${productName} to checkout`, toastStyle());
      }

      const newTotalAmount = calculateTotalAmount(updatedCheckouts);
      const finalAmountItem = calculateItemCount(updatedCheckouts);

      return {
        ...state,
        checkouts: updatedCheckouts,
        amountItem: finalAmountItem,
        totalAmount: newTotalAmount,
      };
    }

    case "TOTAL_CHECKOUT": {
      const total = calculateTotalAmount(state.checkouts);
      return {
        ...state,
        totalAmount: total,
      };
    }

    case "COUNT_CHECKOUT": {
      const count = state.checkouts.reduce(
        (sum, seller) =>
          sum + seller.items.reduce((q, item) => q + item.quantity, 0),
        0
      );
      return {
        ...state,
        countCheckout: count,
      };
    }

    case "REMOVE_FROM_CHECKOUT": {
      const { item, seller } = action.payload;
      console.log(action.payload);

      const updatedCheckoutsAfterRemoval = state.checkouts
        .map((sellerr) => {
          console.log(sellerr);
          if (sellerr.sellerId === seller.sellerId) {
            const updatedItems = sellerr.items.filter(
              (p) => p.productId !== item.productId
            );
            if (updatedItems.length === 0) return null;
            return {
              ...sellerr,
              items: updatedItems,
              updatedAt: new Date().toISOString(),
            };
          }
          return sellerr;
        })
        .filter(Boolean);

      return {
        ...state,
        checkouts: updatedCheckoutsAfterRemoval,
        amountItem: calculateItemCount(updatedCheckoutsAfterRemoval),
        totalAmount: calculateTotalAmount(updatedCheckoutsAfterRemoval),
      };
    }

    case "CLEAR_CHECKOUT": {
      // toast.warning("Warning! Deleted ALL checkouts", toastStyle());
      return {
        ...state,
        checkouts: [],
        amountItem: 0,
        totalAmount: 0,
        countCheckout: 0,
      };
    }

    default:
      return state;
  }
};

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

const calculateTotalAmount = (checkouts) => {
  return checkouts?.reduce((sum, seller) => {
    return (
      sum +
      seller.items.reduce((subSum, product) => {
        const price =
          product.salePrice > 0
            ? product.salePrice
            : product.price - product.discount;
        return subSum + price * product.quantity;
      }, 0)
    );
  }, 0);
};

const calculateItemCount = (checkouts) => {
  return checkouts.reduce((sum, seller) => sum + seller.items.length, 0);
};

export default checkoutReducer;
