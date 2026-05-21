import { useEffect, useState } from "react";
import { products } from "./data/sampleProducts";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [currentPage, setCurrentPage] = useState("home");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  function showMessage(text) {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  }

  function addToCart(product) {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCartItems(updatedCart);
      showMessage(`${product.name} quantity updated in cart.`);
    } else {
      const newItem = {
        ...product,
        quantity: 1
      };

      setCartItems([...cartItems, newItem]);
      showMessage(`${product.name} added to cart.`);
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

  function placeOrder() {
    setCartItems([]);
    setCurrentPage("home");
    showMessage("Order placed successfully.");
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

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

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
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === "checkout" && (
        <Checkout
          cartItems={cartItems}
          placeOrder={placeOrder}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default App;