import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../interfaces/IProduct";

export default function Product({ product }: { product: IProduct }) {
  return (
    <div className="product">
      <div className="product-card">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            className="product-image"
            alt={product.name}
          />
        </Link>
        <div className="product-info">
          <div>
            <p className="product-name">{product.name}</p>
            <p className="product-description">{product.description}</p>
          </div>
          <p className="product-price">${product.price}</p>
        </div>
      </div>
    </div>
  );
}
