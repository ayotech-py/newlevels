import React from "react";
import SimilarProduct from "../components/SimilarProducts";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../components/AuthProvider";
import Loading from "../components/Loading";

const ProductPage = ({ products }) => {
  const { product_id } = useParams();
  const [chat, setChat] = useState("");
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const token = window.localStorage.getItem("accessToken");
  const username = window.localStorage.getItem("username");
  const [btnDisable, setBtnDisable] = useState(true);

  const get_product = products.filter((product) => product.id === product_id);
  const get_similar_product = products.filter(
    (product) => product.category === get_product[0].category,
  );

  const sendChat = async () => {
    setLoading(true);

    const url = `${process.env.REACT_APP_BASE_URL}/chatrooms/`;

    const body = {
      chat: chat,
      product_id: product_id,
    };

    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        user: username,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();
    if (request.status === 200) {
      const chat_data = response["chatData"];
      user.chat_rooms = chat_data["chat_rooms"];
      user.chats = chat_data["chats"];
      updateUser(user);
      setLoading(false);
      setChat("");
    } else {
      setLoading(false);
    }
  };

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
              <Link
                to={`/customer/${get_product[0].customer.name}`}
                className="seller-banner"
              >
                <div className="image-container">
                  <img src={get_product[0].customer.profile_image} alt="" />
                </div>
                <p className="large-size">{get_product[0].customer.name}</p>
              </Link>
              <div className="product-url medium-size">
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
              <div className="location medium-size">
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
              {get_product[0].customer.email !== username ? (
                <div className="product-page-actions">
                  <button
                    onClick={() =>
                      (window.location.href = `tel:+234${get_product[0].customer.phone}`)
                    }
                  >
                    Contact Seller
                  </button>
                  <input
                    type="text"
                    value={chat}
                    onChange={(e) => {
                      setChat(e.target.value);
                      setBtnDisable(e.target.value.length > 0 ? false : true);
                    }}
                    placeholder="Write your message"
                  />
                  <button onClick={sendChat} disabled={btnDisable}>
                    {loading ? <Loading /> : "Send Message"}
                  </button>
                </div>
              ) : (
                <p style={{ marginTop: "30px", lineHeight: "1.5" }}>
                  <i>
                    This product belongs to you, hence you cant message yourself
                  </i>
                </p>
              )}
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
