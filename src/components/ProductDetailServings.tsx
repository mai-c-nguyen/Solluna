import React from "react";

interface IProductDetailServings {
  servings: string;
}
export default function ProductDetailServings({
  servings,
}: IProductDetailServings) {
  return <p>{servings}</p>;
}
