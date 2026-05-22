import { useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

function Admin({ user, isAdmin, setCurrentPage, refreshProducts, products }) {
  const emptyForm = {
    name: "",
    category: "Vegetables",
    price: "",
    description: "",
    image: "",
    active: true
  };

  const [productForm, setProductForm] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setProductForm({
      ...productForm,
      [name]: value
    });
  }

  function resetForm() {
    setProductForm(emptyForm);
    setEditingProductId(null);
  }

  function startEdit(product) {
    setEditingProductId(product.id);

    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      image: product.image,
      active: product.active
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!user) {
        alert("Please login before accessing admin features.");
        setCurrentPage("login");
        return;
    }

        if (!isAdmin) {
        alert("You do not have permission to manage products.");
        setCurrentPage("home");
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

    const productData = {
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

      if (editingProductId) {
        const productRef = doc(db, "products", editingProductId);
        await updateDoc(productRef, productData);
        alert("Product updated successfully.");
      } else {
        await addDoc(collection(db, "products"), productData);
        alert("Product added successfully.");
      }

      resetForm();
      await refreshProducts();
    } catch (error) {
      console.error("Product saving error:", error);
      alert("Failed to save product.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(productId, productName) {
    if (!isAdmin) {
        alert("You do not have permission to delete products.");
        setCurrentPage("home");
        return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${productName}?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteDoc(doc(db, "products", productId));
      await refreshProducts();
      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Product deleting error:", error);
      alert("Failed to delete product.");
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <h1>Admin Panel</h1>
        <p>Add, edit, and delete products for FreshCart.</p>
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
) : !isAdmin ? (
    <div className="empty-cart">
        <h2>Access denied</h2>
        <p>You do not have permission to manage products.</p>

        <button
        className="checkout-btn"
        onClick={() => setCurrentPage("home")}
        >
        Back to Home
        </button>
    </div>
    ) : (
    <>
        <div className="admin-box">
        <h2>
            {editingProductId ? "Edit Product" : "Add New Product"}
        </h2>

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

            <div className="admin-form-actions">
            <button
                className="checkout-btn"
                type="submit"
                disabled={isSaving}
            >
                {isSaving
                ? "Saving..."
                : editingProductId
                ? "Update Product"
                : "Add Product"}
            </button>

            {editingProductId && (
                <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
                >
                Cancel Edit
                </button>
            )}
            </div>
        </form>
        </div>

        <div className="admin-products-box">
        <h2>Manage Products</h2>

        {products.length === 0 ? (
            <p>No products found.</p>
        ) : (
            <div className="admin-product-list">
            {products.map((product) => (
                <div className="admin-product-item" key={product.id}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="admin-product-image"
                />

                <div className="admin-product-info">
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                    <p>${Number(product.price).toFixed(2)}</p>
                </div>

                <div className="admin-product-actions">
                    <button
                    className="edit-btn"
                    onClick={() => startEdit(product)}
                    >
                    Edit
                    </button>

                    <button
                    className="delete-btn"
                    onClick={() =>
                        handleDelete(product.id, product.name)
                    }
                    >
                    Delete
                    </button>
                </div>
                </div>
            ))}
            </div>
        )}
        </div>
    </>
    )}
    </main>
  );
}

export default Admin;