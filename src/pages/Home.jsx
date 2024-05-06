import React from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
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

  return (
    <main className="home">
      <section className="category-list">
        <ul>
          {categories.map((category) => (
            <li>{category}</li>
          ))}
        </ul>
      </section>
      <section className="search">
        <input type="text" placeholder="Search" />
      </section>
      <section className="product-list">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
    </main>
  );
};

export default Home;
