import ProductCard from "../components/ProductCard";

function Home({ products }) {
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

        <div className="product-grid">
          {products.map((product) => (
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