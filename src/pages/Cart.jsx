function Cart({
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
}) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="page">
      <section className="hero">
        <h1>Your Cart</h1>
        <p>Review your selected items before checkout.</p>
      </section>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty.</h2>
          <p>Add some products from the home page.</p>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <h2>{item.name}</h2>
                  <p>{item.category}</p>
                  <p className="cart-price">${item.price.toFixed(2)}</p>

                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item.id)}>
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <div className="item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <span>
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </div>

            <div className="summary-row">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Cart;