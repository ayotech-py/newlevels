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
import "../src/css/Profile.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Ads from "./pages/Ads";
import Profile from "./pages/Profile";

import { AuthProvider } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [products, setProducts] = useState([]);

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
    getProduct();
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
          <Route
            path="/profile"
            element={
              <Layout
                children={
                  <ProtectedRoute>
                    <Profile />
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
