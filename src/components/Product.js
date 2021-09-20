import Button from "./Button.js";
import { Link } from "react-router-dom";


export default function Product({product}) {

  return <>
    <div className="product">
      <div className="product-image-container">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} width="100" height="100" className="product-image" alt={product.name}
        />
      </Link>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>${product.price}</p>

      </div>


    </div>
  </>
}
