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
  { path: "manageseller", component: ManageSeller },
  { path: "manageseller/:sellerid/product", component: ManageSellerProduct },
  { path: "manageproduct", component: ManageAllProduct },
];

export default AdminRoute;
