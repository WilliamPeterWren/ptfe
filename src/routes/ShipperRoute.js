import Login from "../shipper/pages/auth/Login";
import OrderDetail from "../shipper/pages/order/OrderDetail";
import OrderData from "../shipper/pages/order/OrderData";
import RecieveOrder from "../shipper/pages/order/RecieveOrder";

const ShipperRoute = [
  { path: "", component: Login },
  { path: "login", component: Login },

  { path: "order/recieve", component: RecieveOrder },
  { path: "order/order-list", component: OrderData },
  { path: "order/order-detail/:orderId", component: OrderDetail },
];

export default ShipperRoute;
