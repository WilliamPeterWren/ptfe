import "./App.css";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import Index from "./frontend/Index";
import FrontendRoute from "./routes/FrontEndRoute";

import IndexSeller from "./seller/indexSeller";
import SellerRoute from "./routes/SellerRoute";

import IndexShipper from "./shipper/indexShipper";
import ShipperRoute from "./routes/ShipperRoute";

import { UserProvider } from "./context/userContext";
import store from "./redux/store";
import IndexAdmin from "./admin/indexAdmin";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AWCgkeu9uEWxzreBekNc4SwqJXmIaRGunR6WREcrqrlW2_Pe2yEdJMINU96a8JMXGlWZ_DtH576CytV5",
      }}
    >
      <Provider store={store}>
        <UserProvider>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Index />}>
              {FrontendRoute.map((route, index) => {
                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path.replace(/^\//, "")}
                    element={<Page />}
                  />
                );
              })}
            </Route>

            <Route path="/seller" element={<IndexSeller />}>
              {SellerRoute.map((route, index) => {
                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path.replace(/^\/seller\//, "")}
                    element={<Page />}
                  />
                );
              })}
            </Route>

            <Route path="/shipper" element={<IndexShipper />}>
              {ShipperRoute.map((route, index) => {
                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path.replace(/^\/shipper\//, "")}
                    element={<Page />}
                  />
                );
              })}
            </Route>

            <Route path="/admin" element={<IndexAdmin />}>
              {AdminRoute.map((route, index) => {
                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path.replace(/^\/admin\//, "")}
                    element={<Page />}
                  />
                );
              })}
            </Route>
          </Routes>
        </UserProvider>
      </Provider>
    </PayPalScriptProvider>
  );
}

export default App;
