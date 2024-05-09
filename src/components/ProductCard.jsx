import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="image">
        <img src={product.image} alt="" srcset="" />
      </div>
      <div className="description">
        <div className="seller-badge">
          <img src={product.customer.profile_image} alt="" srcset="" />
          <p className="medium-size">Comely Store</p>
        </div>
        <h3 className="medium-size">{product.title.substring(0, 25)} . . .</h3>
        <div className="location medium-size">
          <i class="fa-solid fa-location-dot"></i>
          <p>{product.customer.location}</p>
        </div>
        <h3 className="medium-size">
          ₦{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </h3>
        <Link to={`/product/${product.id}`}>
          <button className="medium-size">Details</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
