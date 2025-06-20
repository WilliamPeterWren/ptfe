import Login from "../admin/pages/auth/Login";
import PeterCategory from "../admin/pages/category/PeterCategory";
import Dashboard from "../admin/pages/dashboard/Dashboard";
import FlashSale from "../admin/pages/flashsale/FlashSale";
import PeterVoucher from "../admin/pages/petervoucher/PeterVoucher";
import Shipping from "../admin/pages/shipping/Shipping";
import ShippingVoucher from "../admin/pages/shippingvoucher/ShippingVoucher";
import ManageUser from "../admin/pages/manageUser/ManageUser";
import ManageSeller from "../admin/pages/manageSeller/ManageSeller";
import ManageAllProduct from "../admin/pages/product/ManageAllProduct";
import ManageSellerProduct from "../admin/pages/manageSellerProduct/ManageSellerProduct";
import ManageShipper from "../admin/pages/manageShipper/ManageShipper";
import ManageUserProfile from "../admin/pages/manageUserProfile/ManageUserProfile";
import UserOrderDetail from "../admin/pages/manageUserProfile/OrderDetail";
import ShipperOrderDetail from "../admin/pages/manageShipperOrder/OrderDetail";
import ManageShipperOrder from "../admin/pages/manageShipperOrder/ManageShipperOrder";
import AdminManageAllOrder from "../admin/pages/manageOrder/AdminManageAllOrder";
import AdminOrderDetail from "../admin/pages/manageOrder/AdminOrderDetail";

const AdminRoute = [
  { path: "", component: Login },
  { path: "login", component: Login },

  { path: "dashboard", component: Dashboard },

  { path: "flashsale", component: FlashSale },
  { path: "shippingfee", component: Shipping },
  { path: "shippingvoucher", component: ShippingVoucher },
  { path: "petervoucher", component: PeterVoucher },
  { path: "petercategory", component: PeterCategory },

  { path: "manageuser", component: ManageUser },
  { path: "manageuser/:userid/profile", component: ManageUserProfile },
  { path: "manageuser/:userid/order-detail/:id", component: UserOrderDetail },

  { path: "manageseller", component: ManageSeller },
  { path: "manageseller/:sellerid/product", component: ManageSellerProduct },

  { path: "manageshipper", component: ManageShipper },
  { path: "manageshipper/:shipperid/order", component: ManageShipperOrder },
  {
    path: "manageshipper/:shipperid/order-detail/:id",
    component: ShipperOrderDetail,
  },

  { path: "manageproduct", component: ManageAllProduct },
  { path: "manageorder", component: AdminManageAllOrder },
  { path: "manageorder/order-detail/:id", component: AdminOrderDetail },
];

export default AdminRoute;
