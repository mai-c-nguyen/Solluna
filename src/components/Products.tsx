import React, { useState, useContext, useEffect } from "react";
import Product from "./Product";
import { FirebaseContext } from "../libraries/firebase";
import { IProduct } from "../interfaces/IProduct";

export default function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const firebaseContext = useContext(FirebaseContext);

  if (!firebaseContext) {
    throw new Error("FirebaseContext is null");
  }

  const {
    api: { getProducts },
  } = firebaseContext;

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchData();
  }, [getProducts]);

  return (
    <div className="products-layout">
      <h1>Our Products</h1>
      <div className="products-grid">
        {products &&
          products.length > 0 &&
          products.map((product, index: number) => {
            return <Product key={index} product={product} />;
          })}
      </div>
    </div>
  );
}
