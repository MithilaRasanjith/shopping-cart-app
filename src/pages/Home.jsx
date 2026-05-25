import ProductCard from "../components/ProductCard";

function Home({
  products,
  selectedCategory,
  setSelectedCategory,
  addToCart
}) {
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
        <h2 className="section-title">
          Available Products ({filteredProducts.length})
        </h2>

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

        {filteredProducts.length === 0 ? (
          <div className="empty-cart">
            <h2>No products found</h2>
            <p>There are no products available in this category right now.</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;