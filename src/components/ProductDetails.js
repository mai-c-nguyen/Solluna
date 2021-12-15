import React, { useState, useEffect, useContext} from "react";
import { Switch, NavLink, Route, useParams, useRouteMatch } from "react-router-dom";
import Product from "./Product.js";
import { FirebaseContext } from "../libraries/firebase";
import ProductDetailInfo from "./ProductDetailInfo.js";
import ProductDetailIngredients from "./ProductDetailIngredients.js";
import ProductDetailServings from "./ProductDetailServings.js";


export default function ProductDetails(props) {
  const [product, setProduct] = useState([]);
  const params = useParams();
  const match = useRouteMatch();

  const {
    api: { getProduct },
  } = useContext(FirebaseContext);

  useEffect(async () => {
    const product = await getProduct(params.id);
    setProduct(product);
  },[]);

    return (
      <div class="product-details-layout">
        <div>
          <h2>{product.name}</h2>
          <img src={product.image} width="125" height="125" class="product-details-image" alt={product.name}
          />
        </div>
        <div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink exact activeClassName="tab-active" to={match.url}>
                Details
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="tab-active" to={match.url + "/ingredients"}>
              Ingredients
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="tab-active" to={match.url + "/servings"}>
                Servings
              </NavLink>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path={match.path}>
            <ProductDetailInfo
              onProductAdd={props.onProductAdd}
              product={product}
            />
          </Route>

          <Route path={match.path + "/ingredients"}>
          <ProductDetailIngredients />
          </Route>

          <Route path={match.path + "/servings"}>
            <ProductDetailServings servings={product.servings} />
          </Route>
        </Switch>
      </div>
    </div>
  );

}
