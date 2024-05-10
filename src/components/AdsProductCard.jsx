import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const AdsProductCard = ({ product }) => {
  const { user, updateUser } = useAuth();

  const handleDelete = async (product_id) => {
    const token = window.localStorage.getItem("accessToken");
    const username = window.localStorage.getItem("username");

    const url = `${process.env.REACT_APP_BASE_URL}/products/${product_id}`;

    const request = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        user: username,
      },
    });

    if (request.ok) {
      let indexToDelete = user.product.findIndex(
        (obj) => obj.id === product_id,
      );

      if (indexToDelete !== -1) {
        user.product.splice(indexToDelete, 1);
        updateUser(user);
        alert("Product deleted successfully!");
        window.location.href = "/ads";
      } else {
        console.log("Object with the specified ID not found.");
      }
    } else {
      alert("An error occured!");
    }
  };
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
        <h3 className="medium-size">{product.title}</h3>
        <div className="location medium-size">
          <i class="fa-solid fa-location-dot"></i>
          <p>{product.customer.location}</p>
        </div>
        <h3 className="medium-size">
          ₦{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </h3>

        <div className="ads-action-btn">
          <Link to={""}>
            <button className="medium-size">Edit</button>
          </Link>
          <Link to={""}>
            <button
              onClick={() => handleDelete(product.id)}
              className="medium-size"
            >
              Delete
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdsProductCard;
