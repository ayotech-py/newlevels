import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import LargeLoading from "../components/LargeLoading";
import ProductNotFound from "../components/ProductNotFound";
import { useAuth } from "../components/AuthProvider";

const Home = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { user } = useAuth();

  const categories = [
    "All",
    "Bags",
    "Jobs",
    "Electronics",
    "Beauty",
    "Fashion",
    "Services",
    "Misc",
  ];

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        (selectedCategory === "All" || product.category === selectedCategory) &&
        (product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase()))
      );
    });
  };

  return (
    <main className="home">
      <section className="category-list">
        <ul>
          {categories.map((category, index) => (
            <li
              className={
                categories[index] === selectedCategory
                  ? "selected-category"
                  : ""
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </section>
      <section className="search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
      </section>
      <section
        className={`${products.length > 0 ? "product-list" : "loading-container"} `}
      >
        {products.length > 0 ? (
          filterProducts(products).length > 0 ? (
            filterProducts(products).map((product) => (
              <ProductCard product={product} />
            ))
          ) : (
            <ProductNotFound />
          )
        ) : (
          <LargeLoading />
        )}
      </section>
    </main>
  );
};

export default Home;
