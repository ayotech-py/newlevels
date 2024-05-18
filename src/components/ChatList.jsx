import React from "react";

const ChatList = ({ image, name, date, message, product }) => {
  return (
    <div className="chat">
      <div className="chat-image">
        <img src={image} alt="" srcset="" />
      </div>
      <div className="chat-details">
        <div className="chat-header">
          <p>{name}</p>
          <p>{date}</p>
        </div>
        <p className="chat-product">{product}</p>
        <p className="chat-message">{message}</p>
      </div>
    </div>
  );
};

export default ChatList;
