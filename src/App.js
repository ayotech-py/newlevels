import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";

import "../src/css/Header.css";
import "../src/css/Home.css";
import "../src/css/ProductCard.css";
import "../src/css/Footer.css";
import "../src/css/Register.css";
import "../src/css/ProductPage.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
