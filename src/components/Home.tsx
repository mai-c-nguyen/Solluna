import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-layout">
      <div>
        <h1>Organic and aromatic tea and herbs.</h1>
        <p>
          Order your tea products from <em>Solluna</em>, the selected
          collections from high mountains, and get your products delivered
          straight to your doorstep.
        </p>
        <Link to="/products" className="btn btn-default">
          Start shopping
        </Link>
      </div>
      <img
        src="https://images.pexels.com/photos/3273989/pexels-photo-3273989.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        width="240"
        height="350"
        className="rounded home-image"
        alt=""
      />
    </div>
  );
}
