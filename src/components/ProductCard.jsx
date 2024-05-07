import React from "react";
import { Link } from "react-router-dom";

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
        <div className="seller-badge">
          <img
            src="https://dynamic.brandcrowd.com/asset/logo/937e0eec-eebf-4294-9029-41619d6c3786/logo-search-grid-1x?logoTemplateVersion=1&v=638369310055500000"
            alt=""
            srcset=""
          />
          <p>Comely Store</p>
        </div>
        <h3>Cargo Pant</h3>
        <div className="location">
          <i class="fa-solid fa-location-dot"></i>
          <p>Newhall, Unilag</p>
        </div>
        <h3>₦19,500</h3>
        <Link to={"/product/48u4r8uj4r7yt6t3g8i3e7y"}>
          <button>Details</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
