import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Index from "./frontend/Index"; // Frontend layout
import FrontendRoute from "./routes/FrontEnd";

import IndexAdmin from "./admin/indexBackend"; // Admin layout
import AdminRoutes from "./routes/Admin";

import { UserProvider } from "./context/userContext";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <ToastContainer />
        <Routes>
          {/* Frontend Layout */}
          <Route path="/" element={<Index />}>
            {FrontendRoute.map((route, index) => {
              const Page = route.component;
              // Make sure route.path is relative (no starting /)
              return (
                <Route
                  key={index}
                  path={route.path.replace(/^\//, "")}
                  element={<Page />}
                />
              );
            })}
          </Route>

          {/* Admin Layout */}
          <Route path="/admin" element={<IndexAdmin />}>
            {AdminRoutes.map((route, index) => {
              const Page = route.component;
              // Make path relative to "/admin"
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
  );
}

export default App;
