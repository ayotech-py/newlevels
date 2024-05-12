import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className={`product-card ${product.featured ? "featured-card" : ""}`}>
      <div className="image">
        <img src={product.image} alt="" srcset="" />
        <p
          className="featured"
          style={{ display: product.featured ? "block" : "none" }}
        >
          <i class="fas fa-star"></i>
          Featured
        </p>
      </div>
      <div className="description">
        <div className="seller-badge">
          <img src={product.customer.profile_image} alt="" srcset="" />
          <p className="medium-size">{product.customer.name}</p>
        </div>
        <h3 className="medium-size medium-size-h3">
          {product.title.substring(0, 40)}
        </h3>
        <div className="location medium-size">
          <i class="fa-solid fa-location-dot"></i>
          <p>{product.customer.location}</p>
        </div>
        <div className="price-x-condition">
          <h3 className="medium-size medium-size-h3">
            ₦{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </h3>
          <p className="condition">
            <i class="fas fa-info-circle"></i>
            {product.condition}
          </p>
        </div>
        <Link to={`/product/${product.id}`}>
          <button className="medium-size">Details</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
