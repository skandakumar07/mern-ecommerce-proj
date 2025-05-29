import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProductDetail from "./pages/ProductDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Header from "./components/Header";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./pages/Products";
import CategoryPage from "./pages/CategoryPage"; // ⬅️ Import this
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const hideHeaderOnRoutes = ["/login", "/register"];
  const shouldHideHeader = hideHeaderOnRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute user={user}>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
