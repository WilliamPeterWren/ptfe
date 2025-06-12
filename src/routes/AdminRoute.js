import Login from "../admin/pages/auth/Login";
import Dashboard from "../admin/pages/dashboard/Dashboard";
import FlashSale from "../admin/pages/flashsale/FlashSale";
import Shipping from "../admin/pages/shipping/Shipping";
import ShippingVoucher from "../admin/pages/shippingvoucher/ShippingVoucher";

const AdminRoute = [
  { path: "", component: Login },
  { path: "login", component: Login },

  { path: "dashboard", component: Dashboard },

  { path: "flashsale", component: FlashSale },

  { path: "shippingfee", component: Shipping },

  { path: "shippingvoucher", component: ShippingVoucher },
];

export default AdminRoute;
