import Login from "../seller/pages/auth/Login";
import Register from "../seller/pages/auth/Register";

import ProductList from "../seller/pages/product/ProductList";
import ProductDetail from "../seller/pages/product/ProductDetail";
import CreateProductPage from "../seller/pages/product/CreateProduct";
import EditProduct from "../seller/pages/product/EditProduct";

import CategoryList from "../seller/pages/category/CategoryList";

import OrderDetail from "../seller/pages/order/OrderDetail";

import SellerDiscount from "../seller/pages/discount/SellerDiscount";
import ProductDiscount from "../seller/pages/discount/ProductDiscount";

import Revenue from "../seller/pages/finance/Revenue";

import ManageDelivery from "../seller/pages/delivery/ManageDelivery";
import ShippingOptions from "../seller/pages/delivery/ShippingMethod";

import Profile from "../seller/pages/Shop/Profile";
import OrderData from "../seller/pages/order/OrderData";

import FlashSale from "../seller/pages/flashsale/FlashSale";
import ProductListDeactive from "../seller/pages/product/ProductListDeactive";

const SellerRoute = [
  { path: "", component: Login },
  { path: "login", component: Login },
  { path: "register", component: Register },

  { path: "product/product-list", component: ProductList },
  { path: "product/product-detail/:id", component: ProductDetail },
  { path: "product/create", component: CreateProductPage },
  { path: "product/update/:id", component: EditProduct },

  { path: "product/product-list/deactive", component: ProductListDeactive },

  { path: "product/flashsale", component: FlashSale },

  { path: "category/category-list", component: CategoryList },

  { path: "order/order-list", component: OrderData },
  { path: "order/order-detail/:orderId", component: OrderDetail },

  { path: "discount/product-discount", component: ProductDiscount },
  { path: "discount/seller-discount", component: SellerDiscount },

  { path: "finance/revenue", component: Revenue },

  { path: "delivery/manage-delivery", component: ManageDelivery },
  { path: "delivery/shipping-method", component: ShippingOptions },

  { path: "shop/profile", component: Profile },
];

export default SellerRoute;
