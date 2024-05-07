import React from "react";
import SimilarProduct from "../components/SimilarProducts";

const ProductPage = () => {
  return (
    <div>
      <div className="product-page">
        <div className="product-image">
          <img
            src="https://res.cloudinary.com/di040wc0d/image/upload/v1/shop_media/product_images/photo_hrvhh8"
            alt=""
          />
        </div>
        <div className="product-description">
          <div className="seller-banner">
            <div className="image-container">
              <img
                src="https://dynamic.brandcrowd.com/asset/logo/937e0eec-eebf-4294-9029-41619d6c3786/logo-search-grid-1x?logoTemplateVersion=1&v=638369310055500000"
                alt=""
              />
            </div>
            <p className="large-size">Ogunbona Toys & Firearms</p>
          </div>
          <div className="product-url">
            <p>Home / Shoes / Yellow Tote Bag</p>
          </div>
          <div className="product-name">
            <p className="x-large-size">Yellow Tote Bag</p>
          </div>
          <div className="ratings">
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
            <span className="star">&#9733;</span>
          </div>
          <div className="location">
            <i class="fa-solid fa-location-dot"></i>
            <p>NewHall, Unilag</p>
          </div>
          <div className="product-info">
            <p className="medium-size">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC.
              It has roots in a piece of classical Latin literature from 45 BC.
              It has roots in a piece of classical Latin literature from 45 BC
            </p>
          </div>
          <div className="product-price">
            <p className="x-large-size">₦70,000</p>
          </div>
          <div className="product-page-actions">
            <button>Contact Seller</button>
            <input type="text" placeholder="Write your message" />
            <button>Send Message</button>
          </div>
        </div>
      </div>
      <SimilarProduct />
    </div>
  );
};

export default ProductPage;
