import React from "react";

const ProductItem = ({ product, openModal }) => (
  <div className="product-item" onClick={() => openModal(product)}>
    <h2>{product.title}</h2>
    <img src={product.images[0]} alt={product.title} />
    <p>Price: ${product.price}</p>
  </div>
);

export default ProductItem;
