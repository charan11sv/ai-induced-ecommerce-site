// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div>
      <Link to={`/product/${product.id}`}>
        <img src={product.image_url} alt={product.name} />
        <h3>{product.name}</h3>
        <p>Price: {product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
