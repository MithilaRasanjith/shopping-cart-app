import { products } from "./data/sampleProducts";

function App() {
  return (
    <div>
      <h1>Shopping Cart Application</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;