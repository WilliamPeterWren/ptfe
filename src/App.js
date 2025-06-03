import "./App.css";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Index from "./frontend/Index";
import FrontendRoute from "./routes/FrontEndRoute";

import IndexSeller from "./seller/indexSeller";
import SellerRoute from "./routes/SellerRoute";

import { UserProvider } from "./context/userContext";
import store from "./redux/store";

function App() {
  return (
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
              // Make path relative to "/admin"
              return (
                <Route
                  key={index}
                  path={route.path.replace(/^\/seller\//, "")}
                  element={<Page />}
                />
              );
            })}
          </Route>
        </Routes>
      </UserProvider>
    </Provider>
  );
}

export default App;
