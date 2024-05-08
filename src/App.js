import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";

import "../src/css/Header.css";
import "../src/css/Home.css";
import "../src/css/ProductCard.css";
import "../src/css/Footer.css";
import "../src/css/Register.css";
import "../src/css/ProductPage.css";
import "../src/css/Ads.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Ads from "./pages/Ads";

const App = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const token = window.localStorage.getItem("access");
    const username = window.localStorage.getItem("username");

    const url = `${process.env.REACT_APP_BASE_URL}/get-customer-data/`;

    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
        user: username,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      //setUser(data.data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Layout children={<Home />} />} />
        </Route>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/product/">
          <Route
            path=":product_id"
            element={<Layout children={<ProductPage />} />}
          />
        </Route>
        <Route path="/ads" element={<Layout children={<Ads />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
