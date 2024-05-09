import React from "react";
import ProductCard from "./ProductCard";

const SimilarProduct = ({ similarProduct }) => {
  return (
    <div className="similar-product">
      <h2>Similar Products</h2>
      <section className="product-list">
        {similarProduct.map((product) => (
          <ProductCard product={product} />
        ))}
      </section>
    </div>
  );
};

export default SimilarProduct;
