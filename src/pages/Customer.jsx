import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductNotFound from "../components/ProductNotFound";
import ProductCard from "../components/ProductCard";
import LargeLoading from "../components/LargeLoading";
import Loading from "../components/Loading";
import { useAuth } from "../components/AuthProvider";

const Customer = ({ product }) => {
  const [customer, setCustomer] = useState(null);
  const [customerProduct, setCustomerProduct] = useState(null);
  const { customer_name } = useParams();
  const [chat, setChat] = useState("");
  const [loading, setLoading] = useState(false);
  const token = window.localStorage.getItem("accessToken");
  const username = window.localStorage.getItem("username");
  const { user, updateUser, logout } = useAuth();
  const [btnDisable, setBtnDisable] = useState(true);

  useEffect(() => {
    function formatUsername(username) {
      const words = username.split("%20");

      const formattedName = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return formattedName;
    }

    function findCustomerAndProductsByName(customerName) {
      const customerProfile = product.find(
        (item) => item.customer.name === customerName,
      )?.customer;

      const products = product.filter(
        (item) => item.customer.name === customerName,
      );

      return {
        customerProfile,
        products,
      };
    }

    const formattedUsername = formatUsername(customer_name);
    const result = findCustomerAndProductsByName(formattedUsername);
    setCustomerProduct(result.products);
    setCustomer(result.customerProfile);
  }, [customer, customer_name, product]);

  const sendChat = async () => {
    setLoading(true);

    const url = `${process.env.REACT_APP_BASE_URL}/chatrooms/`;

    const body = {
      chat: chat,
      customer: customer.email,
    };

    if (!token) {
      alert("Please login to send message!");
      setLoading(false);
      return;
    }

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
    if (request.ok) {
      const chat_data = response["chatData"];
      user.chat_rooms = chat_data["chat_rooms"];
      user.chats = chat_data["chats"];
      updateUser(user);
      setLoading(false);
      setChat("");
    } else if (request.status === 403) {
      alert("Session Expired!, please login again");
      logout();
      window.location.href = "/auth/login";
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      {customer ? (
        <div className="customer-page">
          <div className="page-profile">
            <div className="page-img">
              <img src={customer.profile_image} alt="" srcset="" />
            </div>
            <div className="page-contact">
              <h2>{customer.name}</h2>
              <div className="page-contact-list">
                <i class="fas fa-envelope"></i>
                <p>{customer.email}</p>
              </div>
              <div className="page-contact-list-flex">
                <div className="page-contact-list">
                  <i class="fas fa-map-marker-alt"></i>
                  <p>{customer.location}</p>
                </div>
                <span>|</span>
                <div className="page-contact-list">
                  <i class="fas fa-phone"></i>
                  <p>0{customer.phone}</p>
                </div>
              </div>
              {/* <div className="action-buttons">
                <button className="medium-size">Message</button>
                <button className="medium-size contact-btn">Contact</button>
              </div> */}
              {customer.email !== username ? (
                <div
                  className="product-page-actions"
                  style={{ marginTop: "10px" }}
                >
                  <button
                    onClick={() =>
                      (window.location.href = `tel:+234${customer.phone}`)
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
                  <button
                    onClick={sendChat}
                    id="myButton"
                    disabled={btnDisable}
                  >
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
          <section className="customer-product-list">
            {customerProduct ? (
              customerProduct.map((product) => (
                <ProductCard product={product} />
              ))
            ) : (
              <ProductNotFound />
            )}
          </section>
        </div>
      ) : (
        <LargeLoading />
      )}
    </div>
  );
};

export default Customer;
