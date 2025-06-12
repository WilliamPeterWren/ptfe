import Login from "../seller/pages/auth/Login";

import ProductList from "../seller/pages/product/ProductList";
import ProductDetail from "../seller/pages/product/ProductDetail";
import CreateProductPage from "../seller/pages/product/CreateProduct";
import EditProduct from "../seller/pages/product/EditProduct";

import CategoryList from "../seller/pages/category/CategoryList";

import OrderDetail from "../seller/pages/order/OrderDetail";

import SellerDiscount from "../seller/pages/discount/SellerDiscount";
import ProductDiscount from "../seller/pages/discount/ProductDiscount";

import Revenue from "../seller/pages/finance/Revenue";
import Balance from "../seller/pages/finance/Balance";
import BankingAccount from "../seller/pages/finance/BankingAccount";
import PaymentSetting from "../seller/pages/finance/PaymentSetting";

import ManageDelivery from "../seller/pages/delivery/ManageDelivery";
import ShippingOptions from "../seller/pages/delivery/ShippingMethod";

import Profile from "../seller/pages/Shop/Profile";
import OrderData from "../seller/pages/order/OrderData";

import FlashSale from "../seller/pages/flashsale/FlashSale";

const SellerRoute = [
  { path: "", component: Login },
  { path: "login", component: Login },

  { path: "product/product-list", component: ProductList },
  { path: "product/product-detail/:id", component: ProductDetail },
  { path: "product/create", component: CreateProductPage },
  { path: "product/update/:id", component: EditProduct },

  { path: "product/flashsale", component: FlashSale },

  { path: "category/category-list", component: CategoryList },

  { path: "order/order-list", component: OrderData },
  // { path: "order/canceled", component: OrderList },
  // { path: "order/returnrefundcancel", component: OrderList },
  { path: "order/order-detail/:orderId", component: OrderDetail },

  { path: "discount/product-discount", component: ProductDiscount },
  { path: "discount/seller-discount", component: SellerDiscount },

  { path: "finance/revenue", component: Revenue },
  { path: "finance/balance", component: Balance },
  { path: "finance/banking-account", component: BankingAccount },
  { path: "finance/payment-setting", component: PaymentSetting },

  { path: "delivery/manage-delivery", component: ManageDelivery },
  { path: "delivery/shipping-method", component: ShippingOptions },
  { path: "delivery/shipping-method", component: ShippingOptions },

  { path: "shop/profile", component: Profile },
];

export default SellerRoute;
