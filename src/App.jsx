import { products } from "./data/sampleProducts";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <nav className="navbar">
        <h2>FreshCart</h2>

        <div className="nav-links">
          <button>Home</button>
          <button>Cart</button>
        </div>
      </nav>

      <Home products={products} />
    </div>
  );
}

export default App;