import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

import { products } from "./data/sampleProducts";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [currentPage, setCurrentPage] = useState("home");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

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
    if (!user) {
      showMessage("Please login before placing an order.");
      setCurrentPage("login");
      return;
    }

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

          <button onClick={() => setCurrentPage("login")}>
            {user ? user.email : "Login"}
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

      {currentPage === "login" && (
        <Login
          user={user}
          setUser={setUser}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default App;