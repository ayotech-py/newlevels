import React, { useState } from "react";
import { useAuth } from "../components/AuthProvider";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const Ads = () => {
  const [productImage, setProductImage] = useState(null);
  const [formState, setFormState] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, updateUser } = useAuth();

  const [edit, setEdit] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  function toTitleCase(str) {
    return str.toLowerCase().replace(/(?:^|\s|-)\w/g, function (match) {
      return match.toUpperCase();
    });
  }

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
        window.location.reload();
      } else {
        alert("Object with the specified ID not found.");
      }
    } else {
      alert("An error occured!");
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    const token = window.localStorage.getItem("accessToken");
    const username = window.localStorage.getItem("username");

    const isNullOrEmpty = (value) =>
      value === null || value === undefined || value === "";

    const body = {
      title: name,
      description: description,
      price: price,
      category: category,
      image: productImage,
    };

    for (const key in body) {
      if (body.hasOwnProperty(key) && isNullOrEmpty(body[key])) {
        setMessage(
          `${toTitleCase(key.replaceAll("_", " "))} cannot be blank or empty`,
        );
        setLoading(false);
        return null;
      }
    }

    const url = `${process.env.REACT_APP_BASE_URL}/products/`;

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
    setLoading(false);
    if (request.status === 200) {
      setMessage(response.message);
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setProductImage(null);
      user.product.push(response.product);
      updateUser(user);
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleUpdate = async (product_id) => {
    setLoading(true);
    const token = window.localStorage.getItem("accessToken");
    const username = window.localStorage.getItem("username");

    const isNullOrEmpty = (value) =>
      value === null || value === undefined || value === "";

    const body = {
      id: product_id,
      title: name,
      description: description,
      price: price,
      category: category,
      image: productImage,
    };

    for (const key in body) {
      if (body.hasOwnProperty(key) && isNullOrEmpty(body[key])) {
        setMessage(
          `${toTitleCase(key.replaceAll("_", " "))} cannot be blank or empty`,
        );
        setLoading(false);
        return null;
      }
    }

    const url = `${process.env.REACT_APP_BASE_URL}/products/${product_id}/`;

    const request = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        user: username,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();
    console.log(response);
    setMessage(response.message);
    setLoading(false);
    if (request.status === 200) {
      let index = user.product.findIndex((obj) => obj.id === product_id);
      user.product[index] = response.product;
      updateUser(user);
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (product_id) => {
    let index = user.product.findIndex((obj) => obj.id === product_id);

    setName(user.product[index].title);
    setDescription(user.product[index].description);
    setPrice(user.product[index].price);
    setCategory(user.product[index].category);
    setProductImage(user.product[index].image);

    setEdit(true);
    setFormState(true);
    setUpdateId(product_id);
  };

  const categories = [
    "Bags",
    "Jobs",
    "Electronics",
    "Beauty",
    "Fashion",
    "Services",
    "Misc",
  ];

  const handleImageChange = (setImage) => (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`ads-container ${formState ? "ads-container-form no-scroll" : ""}`}
    >
      <section
        className="ads-form"
        style={{ display: formState ? "block" : "none" }}
      >
        <h2>Add Product</h2>
        <div
          className="response-message"
          style={{ display: message.length > 0 ? "block" : "none" }}
        >
          <p className="medium-size">{message}</p>
        </div>
        <div className="image-div">
          <div className="image-upload">
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange(setProductImage)}
            />
            <label
              htmlFor="imageUpload"
              id="imageBox"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                backgroundColor: "white",
              }}
            >
              {productImage ? (
                <img
                  id="uploadedImage"
                  src={productImage}
                  alt="Uploaded"
                  style={{
                    display: "block",
                  }}
                />
              ) : (
                <span style={{ backgroundColor: "white" }}>
                  Upload Product Image
                </span>
              )}
            </label>
          </div>
        </div>
        <div className="input-fields">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
          />
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product Description"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
          <select
            id="options"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Select Cateogory"
          >
            <option value="" disabled>
              Select Category...
            </option>
            {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="ads-form-btn">
          <button
            className="medium-size save"
            onClick={edit ? () => handleUpdate(updateId) : handleCreate}
          >
            {loading ? <Loading /> : edit ? "Update" : "Post"}
          </button>
          <button
            className="medium-size"
            onClick={() => {
              setFormState(false);
              setEdit(false);
            }}
          >
            Cancel
          </button>
        </div>
      </section>
      <section className="create_ad">
        <button className="large-size" onClick={() => setFormState(true)}>
          Post Ads
        </button>
      </section>
      <section className="product-list">
        {user.product.map((product) => (
          <div className="product-card">
            <div className="image">
              <img src={product.image} alt="" srcset="" />
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
              <h3 className="medium-size">
                ₦
                {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </h3>

              <div className="ads-action-btn">
                <Link to={""}>
                  <button
                    className="medium-size"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
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
        ))}
      </section>
    </div>
  );
};

export default Ads;
