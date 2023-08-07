import React, { useState, useEffect, useContext } from "react";
import {
  Switch,
  NavLink,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { FirebaseContext } from "../libraries/firebase";
import ProductDetailInfo from "./ProductDetailInfo";
import ProductDetailIngredients from "./ProductDetailIngredients";
import ProductDetailServings from "./ProductDetailServings";
import { IProduct } from "../interfaces/IProduct";
import { IProductEmpty } from "../interfaces/IProductEmpty";

export default function ProductDetails(props: any) {
  const [product, setProduct] = useState<IProduct>(IProductEmpty);
  const { id } = useParams<{ id: string }>();
  const match = useRouteMatch();

  const firebaseContext = useContext(FirebaseContext);

  if (!firebaseContext) {
    throw new Error("FirebaseContext is null");
  }

  const {
    api: { getProduct },
  } = firebaseContext;

  useEffect(() => {
    const fetchData = async () => {
      const product: IProduct = await getProduct(id);
      setProduct(product);
    };

    fetchData();
  }, [getProduct, id]);

  return (
    <div className="product-details-layout">
      <div>
        <h2>{product.name}</h2>
        <img src={product.image} className="product-image" alt={product.name} />
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
              <NavLink
                exact
                activeClassName="tab-active"
                to={match.url + "/ingredients"}
              >
                Ingredients
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeClassName="tab-active"
                to={match.url + "/servings"}
              >
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
