import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

function Admin({ user, setCurrentPage, refreshProducts }) {
  const [productForm, setProductForm] = useState({
    name: "",
    category: "Vegetables",
    price: "",
    description: "",
    image: "",
    active: true
  });

  const [isSaving, setIsSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setProductForm({
      ...productForm,
      [name]: value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!user) {
      alert("Please login before accessing admin features.");
      setCurrentPage("login");
      return;
    }

    if (
      productForm.name.trim() === "" ||
      productForm.price === "" ||
      productForm.description.trim() === ""
    ) {
      alert("Please fill name, price, and description.");
      return;
    }

    const newProduct = {
      name: productForm.name.trim(),
      category: productForm.category,
      price: Number(productForm.price),
      description: productForm.description.trim(),
      image:
        productForm.image.trim() ||
        `https://placehold.co/250x180?text=${productForm.name.trim()}`,
      active: true
    };

    try {
      setIsSaving(true);

      await addDoc(collection(db, "products"), newProduct);

      setProductForm({
        name: "",
        category: "Vegetables",
        price: "",
        description: "",
        image: "",
        active: true
      });

      await refreshProducts();

      alert("Product added successfully.");
    } catch (error) {
      console.error("Product adding error:", error);
      alert("Failed to add product.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <h1>Admin Panel</h1>
        <p>Add and manage products for FreshCart.</p>
      </section>

      {!user ? (
        <div className="empty-cart">
          <h2>Admin login required</h2>
          <p>Please login before accessing admin features.</p>

          <button
            className="checkout-btn"
            onClick={() => setCurrentPage("login")}
          >
            Go to Login
          </button>
        </div>
      ) : (
        <div className="admin-box">
          <h2>Add New Product</h2>

          <form onSubmit={handleSubmit} className="admin-form">
            <label>
              Product Name
              <input
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleChange}
                placeholder="Example: Orange"
              />
            </label>

            <label>
              Category
              <select
                name="category"
                value={productForm.category}
                onChange={handleChange}
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Cakes">Cakes</option>
                <option value="Biscuits">Biscuits</option>
              </select>
            </label>

            <label>
              Price
              <input
                type="number"
                name="price"
                value={productForm.price}
                onChange={handleChange}
                placeholder="Example: 2.99"
                step="0.01"
                min="0"
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleChange}
                placeholder="Short product description"
              />
            </label>

            <label>
              Image URL
              <input
                type="text"
                name="image"
                value={productForm.image}
                onChange={handleChange}
                placeholder="Optional image URL"
              />
            </label>

            <button className="checkout-btn" type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Add Product"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}

export default Admin;