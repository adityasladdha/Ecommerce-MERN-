import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useState } from "react";
import Product from "./component/Product/Product";
import ProductDetails from "./component/Product/ProductDetails.js";
import Search from "./component/Product/Search";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile";
import LoginSignUp from "./component/User/LoginSignUp";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";

import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
// import Route from "./component/Route/Route";

import UpdatePassword from "./component/User/UpdatePassword";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./Order/MyOrders";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import OrderDetails from "./Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = React.useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route exact path="/process/payment" element={<Payment />} />
          </Routes>
        </Elements>
      )}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Product />} />
        <Route path="/products/:keywords" element={<Product />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />

        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/cart" element={<Cart />} />

        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/me/update" element={<UpdateProfile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        <Route path="/order/:id" element={<OrderDetails />} />

        <Route isAdmin={true} path="/admin/dashboard" element={<Dashboard />} />
        <Route
          isAdmin={true}
          path="/admin/products"
          element={<ProductList />}
        />
        <Route isAdmin={true} path="/admin/product" element={<NewProduct />} />
        <Route
          isAdmin={true}
          path="/admin/product/:id"
          element={<UpdateProduct />}
        />

        <Route isAdmin={true} path="/admin/orders" element={<OrderList />} />
        <Route
          isAdmin={true}
          path="/admin/order/:id"
          element={<ProcessOrder />}
        />
        <Route isAdmin={true} path="/admin/users" element={<UsersList />} />
        <Route isAdmin={true} path="/admin/user/:id" element={<UpdateUser />} />
        <Route
          isAdmin={true}
          path="/admin/reviews"
          element={<ProductReviews />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
