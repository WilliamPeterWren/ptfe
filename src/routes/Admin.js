import Login from "../admin/pages/auth/Login";
import Logout from "../admin/pages/auth/Logout";

import ProductList from "../admin/pages/product/ProductList";
import ProductDetail from "../admin/pages/product/ProductDetail";
import CreateProductPage from "../admin/pages/product/CreateProduct";
import EditProduct from "../admin/pages/product/EditProduct";

import CategoryList from "../admin/pages/category/CategoryList";
import CategoryDetail from "../admin/pages/category/CategoryDetail";

import OrderList from "../admin/pages/order/OrderList";
import OrderDetail from "../admin/pages/order/OrderDetail";

import SellerDiscount from "../admin/pages/discount/SellerDiscount";
import ProductDiscount from "../admin/pages/discount/ProductDiscount";

import Revenue from "../admin/pages/finance/Revenue";
import Balance from "../admin/pages/finance/Balance";
import BankingAccount from "../admin/pages/finance/BankingAccount";
import PaymentSetting from "../admin/pages/finance/PaymentSetting";

import ManageDelivery from "../admin/pages/delivery/ManageDelivery";
import ShippingOptions from "../admin/pages/delivery/ShippingMethod";

import Profile from "../admin/pages/Shop/Profile";
import OrderData from "../admin/pages/order/OrderData";

const BackendRoute = [
  { path: "", component: Login },
  { path: "login", component: Login },
  { path: "logout", component: Logout },

  { path: "product/product-list", component: ProductList },
  { path: "product/product-detail/:id", component: ProductDetail },
  { path: "product/create", component: CreateProductPage },
  { path: "product/update/:id", component: EditProduct },

  { path: "category/category-list", component: CategoryList },
  { path: "category/category-detail", component: CategoryDetail },

  { path: "order/order-list", component: OrderData },
  { path: "order/canceled", component: OrderList },
  { path: "order/returnrefundcancel", component: OrderList },
  { path: "order/order-detail", component: OrderDetail },

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

export default BackendRoute;
