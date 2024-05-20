import React from "react";

const NoContent = ({ content, width }) => {
  return (
    <div className="product-not-found" style={{ width: width }}>
      <i class="fas fa-exclamation-circle"></i>
      <p>{content}</p>
    </div>
  );
};

export default NoContent;
