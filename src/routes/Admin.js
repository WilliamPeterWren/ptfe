import Dashboard from "../admin/pages/Dashboard/Dashboard";

import CategoryAdmin from "../admin/pages/Category/CategoryAdmin";
import AddCategory from "../admin/pages/Category/AddCategory";
import EditCategory from "../admin/pages/Category/EditCategory";

import ProductAdmin from "../admin/pages/Product/ProductAdmin";
import AddProduct from "../admin/pages/Product/AddProduct";
import EditProductAdmin from "../admin/pages/Product/EditProductAdmin";
import DetailProductAdmin from "../admin/pages/Product/DetailProductAdmin";

import UserAdmin from "../admin/pages/User/UserAdmin";
import DetailUserAdmin from "../admin/pages/User/DetailUserAdmin";

import OrderAdmin from "../admin/pages/Order/OrderAdmin";
import DetailOrderAdmin from "../admin/pages/Order/DetailOrderAdmin";

import BrandAdmin from "../admin/pages/Brand/BrandAdmin";
import AddBrand from "../admin/pages/Brand/AddBrand";
import EditBrand from "../admin/pages/Brand/EditBrand";

import Login from "../admin/pages/Login/Login";
import LogoutAdmin from "../admin/pages/Login/LogoutAdmin";

const BackendRoute = [
  { path: "/", component: Dashboard },
  { path: "/admin", component: Dashboard },
  { path: "/admin/dashboard", component: Dashboard },

  { path: "/admin/login", component: Login },
  { path: "/admin/logout", component: LogoutAdmin },

  { path: "/admin/dashboard/category-admin", component: CategoryAdmin },
  { path: "/admin/dashboard/category-admin/:page", component: CategoryAdmin },
  {
    path: "/admin/dashboard/category-admin/add-category",
    component: AddCategory,
  },
  {
    path: "/admin/dashboard/category-admin/edit-category/:id",
    component: EditCategory,
  },

  { path: "/admin/dashboard/product-admin/:page", component: ProductAdmin },
  { path: "/admin/dashboard/product-admin", component: ProductAdmin },
  { path: "/admin/dashboard/product-admin/add-product", component: AddProduct },
  {
    path: "/admin/dashboard/product-admin/edit-product/:id",
    component: EditProductAdmin,
  },
  {
    path: "/admin/dashboard/product-admin/detail-product/:id",
    component: DetailProductAdmin,
  },

  { path: "/admin/dashboard/user-admin", component: UserAdmin },
  {
    path: "/admin/dashboard/user-admin/detail-user/:id",
    component: DetailUserAdmin,
  },

  { path: "/admin/dashboard/order-admin/:page", component: OrderAdmin },
  { path: "/admin/dashboard/order-admin", component: OrderAdmin },
  {
    path: "/admin/dashboard/order-admin/detail-order/:id",
    component: DetailOrderAdmin,
  },

  { path: "/admin/dashboard/brand-admin", component: BrandAdmin },
  { path: "/admin/dashboard/brand-admin/:page", component: BrandAdmin },
  { path: "/admin/dashboard/brand-admin/add-brand", component: AddBrand },
  { path: "/admin/dashboard/brand-admin/edit-brand/:id", component: EditBrand },
];

export default BackendRoute;
