import { useState, useContext, useEffect } from "react";
import Product from "./Product.js";
import { FirebaseContext } from "../libraries/firebase";


export default function Products() {

  const [products, setProducts] = useState([]);
  const {
    api: { getProducts },
  } = useContext(FirebaseContext);

  useEffect(() => {
    const productsData = getProducts();
    setProducts(productsData);
  },[]);

  return <>
    <div class="products-layout">
      <h1>Products</h1>
      <p>Take a look at our products</p>
      <div class="products-grid">
        {products && products.length > 0 && products.map((product) => {
          return (
            <Product key={product.id} product={product} />
          );
        })}
      </div>
    </div>
  </>;
};
