import Home from "../frontend/pages/Home/Home";
import ProductDetail from "../frontend/pages/productDetail/ProductDetail";
import ProductByCategory from "../frontend/pages/ProductByCategory/ProductByCategory";
import MyProfile from "../frontend/pages/MyProfile/MyProfile";
import FlashSale from "../frontend/pages/FlashSale/FlashSale";

import About from "../frontend/pages/About/About";
import Contact from "../frontend/pages/Contact/Contact";
import NotFound from "../frontend/pages/NotFound";
import Help from "../frontend/pages/Help/Help";

import Product from "../frontend/pages/Product/ProductList";

import Register from "../frontend/pages/User/Register";
import Login from "../frontend/pages/User/Login";
import Logout from "../frontend/pages/User/Logout";

import ForgotPassword from "../frontend/pages/User/ForgotPassword";
import Cart from "../frontend/pages/Cart/Cart";
import Purchase from "../frontend/pages/Purchase/Purchase";

import SearchProducts from "../frontend/pages/Search/SearchProducts";

import UserOrders from "../frontend/pages/Order/UserOrders";
import UserOrderDetail from "../frontend/pages/Order/UserOrderDetail";

const FrontendRoute = [
  { path: "/", component: Home },
  { path: "/home", component: Home },

  { path: "/product-detail/:slug", component: ProductDetail },
  { path: "/products-by-cat/:category", component: ProductByCategory },

  { path: "/user/account/profile", component: MyProfile },

  { path: "/flashsale", component: FlashSale },


  { path: "/about", component: About },

  { path: "*", component: NotFound },
  { path: "/contact", component: Contact },
  { path: "/help", component: Help },

  { path: "/products", component: Product },
  { path: "/products/:page", component: Product },

  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },

  { path: "/forgot-password", component: ForgotPassword },
  { path: "/cart", component: Cart },

  { path: "/make-purchase", component: Purchase },

  { path: "/search/products/:query", component: SearchProducts },

  { path: "/orders", component: UserOrders },
  { path: "/order-detail/:id", component: UserOrderDetail },
];

export default FrontendRoute;
