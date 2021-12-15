import React from 'react';
import Button from "./Button.js";

export default function ProductDetailInfo({ product, onProductAdd }) {

  return (
    <div>
      <p>
        {product.description} sold at <strong>${product.price}</strong> per
        piece.
      </p>
      <Button className="btn btn-default"onClick={() => onProductAdd(product)}>Add to Cart</Button>
    </div>
  );
}
