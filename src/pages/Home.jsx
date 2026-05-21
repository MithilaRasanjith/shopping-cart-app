import ProductCard from "../components/ProductCard";

function Home({ products, selectedCategory, setSelectedCategory }) {
  const categories = ["All", "Vegetables", "Fruits", "Cakes", "Biscuits"];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <main className="page">
      <section className="hero">
        <h1>FreshCart</h1>
        <p>
          Browse fresh vegetables, fruits, cakes, biscuits, and more.
        </p>
      </section>

      <section>
        <h2 className="section-title">Available Products</h2>

        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "active-category" : ""}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;