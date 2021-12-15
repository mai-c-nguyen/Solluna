import React from 'react';
import { NavLink } from "react-router-dom";

export default function Navbar({cart}) {

  const cartCount = cart.reduce((accum, current) => accum + current.quantity, 0)

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        solluna
      </NavLink>
      <ul>
        <li className="nav-item">
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" exact activeClassName="active">
            About
          </NavLink>
        <li className="nav-item">
          <NavLink to="/products" activeClassName="active">
            Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/cart" activeClassName="active">
            Cart({cartCount})
          </NavLink>
        </li>
        </li>
      </ul>
    </nav>
    )
}
