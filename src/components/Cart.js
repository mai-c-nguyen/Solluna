// import Button from "./Button.js";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


export default function Cart({ cart, onProductDelete, onProductIncrement, onProductDecrement }) {

  const totalCart = cart.reduce((accum, current) => accum + current.price * current.quantity, 0);
  const totalItems = cart.reduce((accum, current) => accum + current.quantity, 0);

  return (
      <div class="cart-layout">
        <h2>Your Cart ({totalItems})</h2>
        {cart.length === 0 && (<p>No tea has been added yet</p>)}
        {cart.length > 0 && (cart.map(product => {
          return (
            <div className="cart-product">
                <img src={product.image} alt={product.name}/>
                <div className="cart-product-infos">
                  <p><strong>{product.name}</strong></p>
                  <p><strong>{product.price * product.quantity} USD</strong></p>
                  <div className="product-item-quantity">
                    <button className="btn-decrement" disabled={product.quantity === 0} onClick={() => onProductDecrement(product)}><FontAwesomeIcon icon={faMinus} size="lg" opacity="0.5" /></button>
                    <span>{product.quantity}</span>
                    <button className="btn-increment" onClick={() => onProductIncrement(product)}><FontAwesomeIcon icon={faPlus} size="lg" opacity="0.5" webkit-text-stroke= "2px" /></button>
                  </div>
                  <button className="btn-delete" onClick={() => onProductDelete(product.id)}><FontAwesomeIcon icon={faTrashAlt} size="lg" opacity="0.5" /></button>

                </div>
            </div>
       )
      }))}
      {cart.length === 0 || (
        <div className="cart-product">
           <div className="cart-product-infos">
              <button className="btn btn-default">Proceed to Pay</button>
            </div>
            <p className="total"><strong>Total Price: {totalCart}</strong></p>
          </div>
        )}


    </div>
  );
};
