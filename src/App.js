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

import { AuthProvider } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  /*   const [user, setUser] = useState(null);
   */ const [products, setProducts] = useState([]);

  /* const getUser = async () => {
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
      setUser(data);
    }
  }; */

  const getProduct = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/products/`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ApiAuthorization: process.env.REACT_APP_API_KEY,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setProducts(data);
    }
  };

  useEffect(() => {
    /*     getUser();
     */ getProduct();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <Layout
                  children={
                    <Home products={products.length > 0 ? products : []} />
                  }
                />
              }
            />
          </Route>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/product/">
            <Route
              path=":product_id"
              element={
                <Layout
                  children={
                    <ProductPage
                      products={products.length > 0 ? products : []}
                    />
                  }
                />
              }
            />
          </Route>
          <Route
            path="/ads"
            element={
              <Layout
                children={
                  <ProtectedRoute>
                    <Ads />
                  </ProtectedRoute>
                }
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
