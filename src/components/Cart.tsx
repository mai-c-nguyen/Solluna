import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { IProduct } from "../interfaces/IProduct";
import { IIngredient } from "../interfaces/IIngredient";

export interface IProductInCart extends IProduct {
  quantity: number;
}

interface ICart {
  cart: IProductInCart[];
  onProductDelete: (id: string) => void;
  onProductIncrement: (product: IProductInCart) => void;
  onProductDecrement: (product: IProductInCart) => void;
}
const stripeLoadedPromise = loadStripe(
  "pk_test_51KI4hxCXE800BuZnrEocZLle7ruZH8akqVka3cg9ZNCR4LkvJUmnRzn4DyazXFQfeJOf6i4IbVOQB7Qt0Qp0G4Wt007vTmw14k"
);

const Cart = ({
  cart = [],
  onProductDelete,
  onProductIncrement,
  onProductDecrement,
}: ICart) => {
  const totalCart = Array.isArray(cart)
    ? cart.reduce(
        (accum, current) => accum + current.price * current.quantity,
        0
      )
    : 0;
  const totalItems = Array.isArray(cart)
    ? cart.reduce((accum, current) => accum + current.quantity, 0)
    : 0;

  const handleClick = () => {
    const lineItems = cart.map((product) => {
      return { price: product.price_id, quantity: product.quantity };
    });

    stripeLoadedPromise.then((stripe: any) => {
      stripe
        .redirectToCheckout({
          lineItems: lineItems,
          mode: "payment",
          successUrl: "https://solluna.netlify.app/success",
          cancelUrl: "https://solluna.netlify.app/canceled",
        })
        .then((response: any) => {
          // this will only log if the redirect did not work
          console.log(response.products);
        })
        .catch((error: any) => {
          // wrong API key? you will see the error message here
          console.log(error);
        });
    });
  };

  return (
    <div>
      <h2>Your Cart ({totalItems})</h2>

      {Array.isArray(cart) && cart.length === 0 && (
        <p>No tea has been added yet</p>
      )}
      <div className="cart-layout">
        {Array.isArray(cart) &&
          cart.length > 0 &&
          cart.map((product) => {
            return (
              <div className="cart-items" key={product.id}>
                <div className="image-box">
                  <img
                    src={product.image}
                    className="cart-image"
                    width="150"
                    height="150"
                    alt={product.name}
                  />
                </div>
                <div className="about">
                  <p className="title">{product.name}</p>
                  <p className="subtitle">{product.description}</p>
                </div>
                <div className="counter">
                  <button
                    className="btn-counter"
                    disabled={product.quantity === 0}
                    onClick={() => onProductDecrement(product)}
                  >
                    <FontAwesomeIcon icon={faMinus} size="sm" opacity="0.5" />
                  </button>
                  <div className="count">{product.quantity}</div>
                  <button
                    className="btn-counter"
                    onClick={() => onProductIncrement(product)}
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      size="sm"
                      opacity="0.5"
                      webkit-text-stroke="2px"
                    />
                  </button>
                </div>
                <div className="prices">
                  <div className="amount">
                    <p>${product.quantity * product.price}</p>
                  </div>
                  <button
                    className="btn-delete"
                    onClick={() => onProductDelete(product.id)}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      size="lg"
                      opacity="0.5"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        {(Array.isArray(cart) && cart.length === 0) || (
          <div className="cart-checkout">
            <hr></hr>
            <div className="checkout">
              <div className="total">
                <div>
                  <div className="total">Total</div>
                </div>
                <div className="total-amount">${totalCart}</div>
              </div>
              <button className="button" onClick={handleClick}>
                Proceed to pay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
