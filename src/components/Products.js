import React, { useState, useContext, useEffect } from "react";
import Product from "./Product.js";
import { FirebaseContext } from "../libraries/firebase";


export default function Products() {
  const [products, setProducts] = useState([]);
  const {
    api: { getProducts },
  } = useContext(FirebaseContext);


  useEffect(async () => {
    setProducts(await getProducts());
  },[]);

  return (
    <div class="products-layout">
      <h1>Our Products</h1>
      <div class="products-grid">
        {products && products.length > 0 && products.map((product, index) => {
          return (
            <Product key={index} product={product} index={index}/>
          );
        })}
      </div>
    </div>
  );
};
