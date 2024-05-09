import React, { useState } from "react";
import AdsProductCard from "../components/AdsProductCard";
import { useAuth } from "../components/AuthProvider";
import Loading from "../components/Loading";

const Ads = () => {
  const [productImage, setProductImage] = useState(null);
  const [formState, setFormState] = useState(false);
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function toTitleCase(str) {
    return str.toLowerCase().replace(/(?:^|\s|-)\w/g, function (match) {
      return match.toUpperCase();
    });
  }

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
    console.log(response);
    setMessage(response.message);
    setLoading(false);
    if (request.status === 200) {
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setProductImage(null);
    }
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
          <button className="medium-size save" onClick={handleCreate}>
            {loading ? <Loading /> : "Post"}
          </button>
          <button className="medium-size" onClick={() => setFormState(false)}>
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
          <AdsProductCard product={product} />
        ))}
      </section>
    </div>
  );
};

export default Ads;
