import { useState } from "react";
import { products } from "./data/sampleProducts";
import Home from "./pages/Home";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);

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

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      <nav className="navbar">
        <h2>FreshCart</h2>

        <div className="nav-links">
          <button>Home</button>
          <button>Cart ({cartCount})</button>
        </div>
      </nav>

      <Home
        products={products}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        addToCart={addToCart}
      />
    </div>
  );
}

export default App;