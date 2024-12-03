import React from "react";

const ProductModal = ({ product, onClose }) => (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <h2>{product.title}</h2>
      <img src={product.images[0]} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  </div>
);

export default ProductModal;
