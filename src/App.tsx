import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import { IProductInCart } from "./components/Cart";

const App = () => {
  const [cart, setCart] = React.useState<IProductInCart[]>(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (err) {
        console.warn("Could not parse the cart");
      }
    }
    return [];
  });

  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  console.log("cart in app", cart);

  const handleProductDelete = (id: string) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  };

  const handleProductAdd = (newProduct: IProductInCart) => {
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
  };

  const handleProductIncrement = (product: IProductInCart) => {
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
  };

  const handleProductDecrement = (product: IProductInCart) => {
    const exist: IProductInCart | undefined = cart?.find(
      (cartItem: IProductInCart) => cartItem.id === product.id
    );
    if (exist?.quantity && exist?.quantity > 0) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === product.id
            ? { ...exist, quantity: exist.quantity - 1 }
            : cartItem
        )
      );
    }
  };

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
};

export default App;
