import React, { useState } from "react";
import Loading from "../components/Loading";
import { useAuth } from "../components/AuthProvider";
import compressImage from "../components/ImageCompressor";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [formState, setFormState] = useState(false);

  const [profileImage, setProfileImage] = useState(user.customer.profile_image);
  const [name, setName] = useState(user.customer.name);
  const [email, setEmail] = useState(user.customer.email);
  const [phone, setPhone] = useState(user.customer.phone);
  const [location, setLocation] = useState(user.customer.location);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function toTitleCase(str) {
    return str.toLowerCase().replace(/(?:^|\s|-)\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  const handleImageChange = (setImage) => async (event) => {
    let file = event.target.files[0];
    file = await compressImage(file);
    console.log(file);
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    const token = window.localStorage.getItem("accessToken");
    const username = window.localStorage.getItem("username");

    const isNullOrEmpty = (value) =>
      value === null || value === undefined || value === "";

    const body = {
      name: name,
      email: email,
      phone: phone,
      location: location,
      image: profileImage,
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

    const url = `${process.env.REACT_APP_BASE_URL}/update-customer-data/`;

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
      updateUser(response.userData);
    } else if (request.status === 400) {
      setMessage(response.message);
    } else {
      setMessage("Session Expired, please login again!");
      window.location.href = "/auth/login";
    }
    setTimeout(() => setMessage(""), 3000);
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
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <textarea
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
        </div>
        <div className="ads-form-btn">
          <button className="medium-size save" onClick={handleUpdate}>
            {loading ? <Loading /> : "Update Profile"}
          </button>
          <button
            className="medium-size"
            onClick={() => {
              setFormState(false);
            }}
          >
            Cancel
          </button>
        </div>
      </section>
      <div className="profile-page">
        <div className="aside-profile">
          <div className="profile-image">
            <img src={user.customer.profile_image} alt="" srcset="" />
          </div>
          <p>
            Welcome back {user.customer.name}! <br /> {user.customer.location}
          </p>
          <button onClick={() => setFormState(true)}>Update Profile</button>
        </div>
        <div className="main-profile">
          <div className="profile-detail">
            <p>Name: {user.customer.name}</p>
          </div>
          <div className="profile-detail">
            <p>Email: {user.customer.email}</p>
          </div>
          <div className="profile-detail">
            <p>Phone: {user.customer.phone}</p>
          </div>
          <div className="profile-detail">
            <p>Location: {user.customer.location}</p>
          </div>
          <div className="profile-detail">
            <p>Ads: {user.product.length} Products</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
