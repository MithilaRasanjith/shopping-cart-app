function Checkout({ cartItems, placeOrder, setCurrentPage }) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="page">
      <section className="hero">
        <h1>Checkout</h1>
        <p>Review your order before placing it.</p>
      </section>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>No items to checkout.</h2>
          <p>Please add products to your cart first.</p>

          <button
            className="checkout-btn"
            onClick={() => setCurrentPage("home")}
          >
            Back to Products
          </button>
        </div>
      ) : (
        <div className="checkout-box">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div className="checkout-item" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>

              <strong>
                ${(item.price * item.quantity).toFixed(2)}
              </strong>
            </div>
          ))}

          <div className="checkout-total">
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>

          <button
            className="checkout-btn"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>
      )}
    </main>
  );
}

export default Checkout;