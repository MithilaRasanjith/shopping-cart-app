function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h2>{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>

        <button className="add-cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;