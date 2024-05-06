import React from "react";

const ProductCard = () => {
  return (
    <div className="product-card">
      <div className="image">
        <img
          src="https://res.cloudinary.com/djqqqetjx/image/upload/v1704142114/b8njgovxlecyzvqgtiae.jpg"
          alt=""
          srcset=""
        />
      </div>
      <div className="description">
        <h3>Cargo Pant</h3>
        <p>Comely Store</p>
        <div className="location">
          <i class="fa-solid fa-location-dot"></i>
          <p>Abuja</p>
        </div>
        <h3>₦19,500</h3>
        <button>Details</button>
      </div>
    </div>
  );
};

export default ProductCard;
