import { NavLink } from "react-router-dom";

export default function Navbar() {

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        Solluna
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
            Cart(0)
          </NavLink>
        </li>
        </li>
      </ul>
    </nav>
    )
}
