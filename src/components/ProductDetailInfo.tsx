import React from "react";
import Button from "./Button";
import { useHistory } from "react-router-dom";
import { IProductInCart } from "./Cart";
import { IProduct } from "../interfaces/IProduct";

interface IProductDetailInfo {
  product: IProduct;
  onProductAdd: (product: IProduct) => void;
}
export default function ProductDetailInfo({
  product,
  onProductAdd,
}: IProductDetailInfo) {
  const history = useHistory();
  return (
    <div>
      <p>
        {product.description} sold at <strong>${product.price}</strong> per
        piece.
      </p>
      <div className="product-details-buttons">
        <Button
          className="btn btn-default"
          onClick={() => onProductAdd(product)}
        >
          Add to Cart
        </Button>
        <Button
          className="btn btn-default cart-navigation"
          style={{ background: "white" }}
          onClick={() => history.push("/cart")}
        >
          Go to Cart
        </Button>
      </div>
    </div>
  );
}
