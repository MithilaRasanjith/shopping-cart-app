import { useState } from "react";
import { products } from "./data/sampleProducts";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");

  function addToCart(product) {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCartItems(updatedCart);
    } else {
      const newItem = {
        ...product,
        quantity: 1
      };

      setCartItems([...cartItems, newItem]);
    }
  }

  function increaseQuantity(id) {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartItems(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
  }

  function removeFromCart(id) {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      <nav className="navbar">
        <h2>FreshCart</h2>

        <div className="nav-links">
          <button onClick={() => setCurrentPage("home")}>
            Home
          </button>

          <button onClick={() => setCurrentPage("cart")}>
            Cart ({cartCount})
          </button>
        </div>
      </nav>

      {currentPage === "home" && (
        <Home
          products={products}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          addToCart={addToCart}
        />
      )}

      {currentPage === "cart" && (
        <Cart
          cartItems={cartItems}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
        />
      )}
    </div>
  );
}

export default App;