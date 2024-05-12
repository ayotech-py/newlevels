import React from "react";
import SimilarProduct from "../components/SimilarProducts";
import { useParams } from "react-router-dom";

const ProductPage = ({ products }) => {
  const { product_id } = useParams();

  const get_product = products.filter((product) => product.id === product_id);
  const get_similar_product = products.filter(
    (product) => product.category === get_product[0].category,
  );

  return (
    <div>
      {products.length > 0 ? (
        <div>
          <div className="product-page">
            <div className="product-image">
              <img src={get_product[0].image} alt="" />
              <p
                className="featured"
                style={{ display: get_product[0].featured ? "block" : "none" }}
              >
                <i class="fas fa-star"></i>
                Featured
              </p>
            </div>
            <div className="product-description">
              <div className="seller-banner">
                <div className="image-container">
                  <img src={get_product[0].customer.profile_image} alt="" />
                </div>
                <p className="large-size">{get_product[0].customer.name}</p>
              </div>
              <div className="product-url">
                <p>
                  Home / {get_product[0].category} / {get_product[0].title}
                </p>
              </div>
              <div className="product-name">
                <p className="x-large-size">{get_product[0].title}</p>
              </div>
              <div className="ratings">
                <div>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                  <span className="star">&#9733;</span>
                </div>
                <div className="product-page-condition">
                  <p className="condition">
                    <i class="fas fa-info-circle"></i>
                    Fairly Used
                  </p>
                </div>
              </div>
              <div className="location">
                <i class="fa-solid fa-location-dot"></i>
                <p>{get_product[0].customer.location}</p>
              </div>
              <div className="product-info">
                <p className="medium-size">{get_product[0].description}</p>
              </div>
              <div className="product-price">
                <p className="x-large-size">
                  ₦
                  {get_product[0].price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </div>
              <div className="product-page-actions">
                <button>Contact Seller</button>
                <input type="text" placeholder="Write your message" />
                <button>Send Message</button>
              </div>
            </div>
          </div>
          <SimilarProduct similarProduct={get_similar_product} />
        </div>
      ) : (
        <>E didnt</>
      )}
    </div>
  );
};

export default ProductPage;
