import { useState } from "react";
import { products } from "./data/sampleProducts";
import Home from "./pages/Home";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div>
      <nav className="navbar">
        <h2>FreshCart</h2>

        <div className="nav-links">
          <button>Home</button>
          <button>Cart</button>
        </div>
      </nav>

      <Home
        products={products}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}

export default App;