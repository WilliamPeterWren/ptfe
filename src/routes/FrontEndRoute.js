import Home from "../frontend/pages/Home/Home";

//auth
import Register from "../frontend/pages/User/Register";
import Login from "../frontend/pages/User/Login";
import Logout from "../frontend/pages/User/Logout";
import ForgotPassword from "../frontend/pages/User/ForgotPassword";

import MyProfile from "../frontend/pages/MyProfile/MyProfile";

// product
import ProductDetail from "../frontend/pages/productDetail/ProductDetail";
import ProductByCategory from "../frontend/pages/ProductByCategory/ProductByCategory";
import FlashSale from "../frontend/pages/FlashSale/FlashSale";

import SuggestToday from "../frontend/pages/SuggestToday/SuggestToday";

// search
import SearchProducts from "../frontend/pages/Search/SearchProducts";

// cart
import Cart from "../frontend/pages/Cart/Cart";

// check out
import CheckOut from "../frontend/pages/Checkout/CheckOut";

// ------------------------ seller section ------------------------
import SellerPage from "../frontend/pages/Seller/SellerPage";

// ------------------------ nothing ------------------------
import NotFound from "../frontend/pages/NotFound";
import About from "../frontend/pages/About/About";
import Contact from "../frontend/pages/Contact/Contact";
import Help from "../frontend/pages/Help/Help";
import ProductID from "../frontend/pages/productId/ProductID";
import TopSearch from "../frontend/pages/TopSearch/TopSearch";
import Callback from "../frontend/pages/auth/CallBack";

const FrontendRoute = [
  // ------------ home ------------
  { path: "/", component: Home },
  { path: "/home", component: Home },

  // ------------ auth ------------
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
  { path: "/callback", component: Callback },
  { path: "/forgot-password", component: ForgotPassword },

  { path: "/user/account/profile", component: MyProfile },

  // ------------ product ------------
  { path: "/product-detail/:slug", component: ProductDetail },
  { path: "/product-detail/productid/:productId", component: ProductID },
  { path: "/products-by-cat/:category", component: ProductByCategory },
  { path: "/todaysuggest", component: SuggestToday },
  { path: "/topsearch", component: TopSearch },

  // ------------ flashsale ------------
  { path: "/flashsale", component: FlashSale },

  // ------------ search ------------
  { path: "/search/products/:productname", component: SearchProducts },

  // ------------ cart ------------
  { path: "/cart", component: Cart },

  // ------------ checkout ------------
  { path: "/checkout", component: CheckOut },

  // ------------ seller ------------
  { path: "/seller/page/:sellerId", component: SellerPage },

  // ------------ nothing ------------
  { path: "*", component: NotFound },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/help", component: Help },
];

export default FrontendRoute;
