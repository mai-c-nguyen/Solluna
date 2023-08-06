import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import Products from "./components/Products.js";
import Cart from "./components/Cart.js";
import ProductDetails from "./components/ProductDetails.js";

function App() {
  const [cart, setCart] = React.useState(function () {
    let savedCart = [];
    try {
      savedCart = JSON.parse(localStorage.getItem("cart"));
    } catch {
      console.warn("Could not parse the cart");
    }
    console.log("savedCArt?", savedCart);
    return savedCart || [];
  });

  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  console.log("cart in app", cart);

  function handleProductDelete(id) {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  }

  function handleProductAdd(newProduct) {
    // check if item exists
    const existingProduct = cart.find(
      (product) => product.id === newProduct.id
    );

    if (existingProduct) {
      // increase quantity
      const updatedCart = cart.map((product) => {
        if (product.id === newProduct.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      setCart(updatedCart);
    } else {
      // product is new to the cart
      setCart([
        ...cart,
        {
          ...newProduct,
          quantity: 1,
        },
      ]);
    }
  }

  function handleProductIncrement(product) {
    const exist = cart.find((cartItem) => cartItem.id === product.id);
    if (exist) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === product.id
            ? { ...exist, quantity: exist.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function handleProductDecrement(product) {
    const exist = cart.find((cartItem) => cartItem.id === product.id);
    if (exist.quantity > 0) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === product.id
            ? { ...exist, quantity: exist.quantity - 1 }
            : cartItem
        )
      );
    }
  }

  return (
    <BrowserRouter>
      <Navbar cart={cart} />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route path="/products/:id">
            <ProductDetails onProductAdd={handleProductAdd} />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              onProductDelete={handleProductDelete}
              onProductIncrement={handleProductIncrement}
              onProductDecrement={handleProductDecrement}
            />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
