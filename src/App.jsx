import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where
} from "firebase/firestore";
import { auth, db } from "./firebase/firebaseConfig";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [currentPage, setCurrentPage] = useState("home");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  async function fetchProducts() {
    try {
      setIsLoadingProducts(true);

      const productsQuery = query(
        collection(db, "products"),
        where("active", "==", true)
      );

      const querySnapshot = await getDocs(productsQuery);

      const productsFromFirestore = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setProducts(productsFromFirestore);
    } catch (error) {
      console.error("Product loading error:", error);
      showMessage("Failed to load products.");
    } finally {
      setIsLoadingProducts(false);
    }
  }

  useEffect(() => {
    fetchProducts();
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

  async function placeOrder() {
    if (!user) {
      showMessage("Please login before placing an order.");
      setCurrentPage("login");
      return;
    }

    if (cartItems.length === 0) {
      showMessage("Your cart is empty.");
      setCurrentPage("home");
      return;
    }

    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const orderData = {
      userId: user.uid,
      userName: user.displayName,
      userEmail: user.email,
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity
      })),
      totalPrice: totalPrice,
      status: "pending",
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, "orders"), orderData);

      setCartItems([]);
      setCurrentPage("home");
      showMessage("Order placed and saved successfully.");
    } catch (error) {
      console.error("Order saving error:", error);
      showMessage("Failed to place order. Please try again.");
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
          <button onClick={() => setCurrentPage("home")}>
            Home
          </button>

          <button onClick={() => setCurrentPage("cart")}>
            Cart ({cartCount})
          </button>

          <button onClick={() => setCurrentPage("admin")}>
            Admin
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
        isLoadingProducts ? (
          <main className="page">
            <section className="hero">
              <h1>Loading products...</h1>
              <p>Please wait while we load the product catalog.</p>
            </section>
          </main>
        ) : (
          <Home
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            addToCart={addToCart}
          />
        )
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

      {currentPage === "admin" && (
        <Admin
          user={user}
          setCurrentPage={setCurrentPage}
          refreshProducts={fetchProducts}
        />
      )}
    </div>
  );
}

export default App;