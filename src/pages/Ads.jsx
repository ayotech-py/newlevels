import React, { useState } from "react";
import AdsProductCard from "../components/AdsProductCard";

const Ads = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [formState, setFormState] = useState(false);

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
        <div className="image-div">
          <div className="image-upload">
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange(setProfileImage)}
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
              {profileImage ? (
                <img
                  id="uploadedImage"
                  src={profileImage}
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
          <input type="text" placeholder="Product Name" />
          <textarea type="text" placeholder="Product Description" />
          <input type="number" placeholder="Price" />
          <select id="options" placeholder="Select Cateogory">
            <option value="" disabled>
              Select Cateogory...
            </option>
            {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="ads-form-btn">
          <button className="medium-size save">Save</button>
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
        <AdsProductCard />
        <AdsProductCard />
        <AdsProductCard />
        <AdsProductCard />
        <AdsProductCard />
        <AdsProductCard />
        <AdsProductCard />
        <AdsProductCard />
        <AdsProductCard />
        <AdsProductCard />
      </section>
    </div>
  );
};

export default Ads;
