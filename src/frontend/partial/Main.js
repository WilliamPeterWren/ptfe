import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";

import Register from "../pages/User/Register";
import Login from "../pages/User/Login";

import ProductDetail from "../pages/Product/ProductDetail";
import ProductList from "../pages/Product/ProductList";
import MyProfile from "../pages/MyProfile/MyProfile";

import Cart from "../pages/Cart/Cart";

const Main = () => (
  <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product" element={<ProductDetail />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/my-profile" element={<MyProfile />} />
  
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </main>
);
export default Main;
