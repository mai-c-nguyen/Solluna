import { useState, useEffect, useContext} from "react";
import { Switch, NavLink, Route, useParams, useRouteMatch } from "react-router-dom";
import Product from "./Product.js";
import { FirebaseContext } from "../libraries/firebase";

export default function ProductDetails(props) {
  const [product, setProduct] = useState({});
  const params = useParams();
  const match = useRouteMatch();
  console.log(match);

  const {
    api: { getProduct },
  } = useContext(FirebaseContext);

  useEffect(() => {
    const product = getProduct(params.id);
    setProduct(product);
  },{});
  console.log(product);

    return <>
      <div class="product-details-layout">
        <div>
          <h2>{product.name}</h2>
          <img src={product.image} width="125" height="125" class="product-details-image" alt={product.name}
          />
        </div>
        <div>
          <div class="tabs">
            <ul>
              <li>
                <a class="tab-active">Details</a>
              </li>
              <li>
                <a>Ingredients</a>
              </li>
              <li>
                <a>Servings</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>

}
