import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const stripeLoadedPromise = loadStripe(
  "pk_test_51KI4hxCXE800BuZnrEocZLle7ruZH8akqVka3cg9ZNCR4LkvJUmnRzn4DyazXFQfeJOf6i4IbVOQB7Qt0Qp0G4Wt007vTmw14k"
);

export default function Cart({
  cart = [],
  onProductDelete,
  onProductIncrement,
  onProductDecrement,
}) {
  const totalCart = Array.isArray(cart)
    ? cart.reduce(
        (accum, current) => accum + current.price * current.quantity,
        0
      )
    : 0;
  const totalItems = Array.isArray(cart)
    ? cart.reduce((accum, current) => accum + current.quantity, 0)
    : 0;

  function handleClick(event) {
    const lineItems = cart.map((product) => {
      return { price: product.price_id, quantity: product.quantity };
    });

    stripeLoadedPromise.then((stripe) => {
      stripe
        .redirectToCheckout({
          lineItems: lineItems,
          mode: "payment",
          successUrl: "https://solluna.netlify.app/success",
          cancelUrl: "https://solluna.netlify.app/canceled",
        })
        .then((response) => {
          // this will only log if the redirect did not work
          console.log(response.error);
        })
        .catch((error) => {
          // wrong API key? you will see the error message here
          console.log(error);
        });
    });
  }

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
              <div class="cart-items">
                <div class="image-box">
                  <img
                    src={product.image}
                    className="cart-image"
                    width="150"
                    height="150"
                    alt={product.name}
                  />
                </div>
                <div class="about">
                  <p class="title">{product.name}</p>
                  <p class="subtitle">{product.description}</p>
                </div>
                <div class="counter">
                  <button
                    className="btn-counter"
                    disabled={product.quantity === 0}
                    onClick={() => onProductDecrement(product)}
                  >
                    <FontAwesomeIcon icon={faMinus} size="sm" opacity="0.5" />
                  </button>
                  <div class="count">{product.quantity}</div>
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
                <div class="prices">
                  <div class="amount">
                    <p>${product.quantity * product.price}</p>
                  </div>
                  <button
                    className="btn-delete"
                    onClick={() => onProductDelete(product.id)}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      size="md"
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
            <div class="checkout">
              <div class="total">
                <div>
                  <div class="total">Total</div>
                </div>
                <div class="total-amount">${totalCart}</div>
              </div>
              <button class="button" onClick={handleClick}>
                Proceed to pay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
