import { useState, useEffect } from "react";
import { Switch, NavLink, Route, useParams, useRouteMatch } from "react-router-dom";

export default ProductDetails(props) {
    const [product, setProduct] = useState({});
    const params = useParams();
    const match = useRouteMatch();

    // useEffect

    return <>
      <div class="product-details-layout">
        <div>
          <h2>Product name here</h2>
          <img width="125" height="125" class="product-details-image" alt="product name here"
          />
        </div>
        <div>
          <div class="tabs">
            <ul>
              <li>
                <a class="tab-active">Details</a>
              </li>
              <li>
                <a>Nutrition</a>
              </li>
              <li>
                <a>Storage</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>

}
