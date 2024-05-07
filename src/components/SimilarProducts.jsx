import React from "react";
import ProductCard from "./ProductCard";

const SimilarProduct = () => {
  return (
    <div className="similar-product">
      <h2>Similar Products</h2>
      <section className="product-list">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>
    </div>
  );
};

export default SimilarProduct;
