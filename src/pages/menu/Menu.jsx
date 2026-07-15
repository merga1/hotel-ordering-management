import { useMemo, useState } from "react";
import { FiEdit3, FiPlus, FiSearch, FiToggleLeft, FiToggleRight, FiTrash2 } from "react-icons/fi";
import { MdRestaurantMenu } from "react-icons/md";
import toast from "react-hot-toast";

const initialMenuItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    category: "Mains",
    price: 14.75,
    status: "Available",
    prepTime: "22 min",
    ordersToday: 38,
    description: "Aromatic rice, tender chicken, raita, and kachumbari.",
  },
  {
    id: 2,
    name: "Grilled Tilapia",
    category: "Grill",
    price: 17.25,
    status: "Available",
    prepTime: "25 min",
    ordersToday: 42,
    description: "Whole tilapia with lemon butter, ugali, and greens.",
  },
  {
    id: 3,
    name: "Passion Mint Cooler",
    category: "Drinks",
    price: 4.8,
    status: "Available",
    prepTime: "5 min",
    ordersToday: 31,
    description: "Passion fruit, mint, lime, and sparkling water.",
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    category: "Desserts",
    price: 7.4,
    status: "Hidden",
    prepTime: "14 min",
    ordersToday: 12,
    description: "Warm chocolate cake with vanilla ice cream.",
  },
];

const categories = ["All", "Breakfast", "Mains", "Grill", "Drinks", "Desserts"];

function Menu() {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Mains",
    price: "",
    prepTime: "",
    description: "",
  });

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch = `${item.name} ${item.description}`.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, selectedCategory, searchTerm]);

  const visibleCount = menuItems.filter((item) => item.status === "Available").length;
  const hiddenCount = menuItems.length - visibleCount;

  const updateNewItem = (event) => {
    const { name, value } = event.target;
    setNewItem((currentItem) => ({ ...currentItem, [name]: value }));
  };

  const addMenuItem = (event) => {
    event.preventDefault();

    const item = {
      id: Date.now(),
      name: newItem.name,
      category: newItem.category,
      price: Number(newItem.price),
      status: "Available",
      prepTime: newItem.prepTime || "15 min",
      ordersToday: 0,
      description: newItem.description,
    };

    setMenuItems((currentItems) => [item, ...currentItems]);
    setNewItem({ name: "", category: "Mains", price: "", prepTime: "", description: "" });
    toast.success("Food item added to menu");
  };

  const toggleAvailability = (itemId) => {
    setMenuItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId
          ? { ...item, status: item.status === "Available" ? "Hidden" : "Available" }
          : item,
      ),
    );
  };

  const removeItem = (itemId) => {
    setMenuItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
    toast.success("Food item removed");
  };

  return (
    <main className="dashboard-content management-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Menu Management</p>
          <h1>Food items, categories, and availability</h1>
        </div>
        <button className="secondary-button" type="button">
          Import Menu
        </button>
      </section>

      <section className="summary-grid compact-summary">
        <article className="metric-card">
          <div className="metric-icon"><MdRestaurantMenu /></div>
          <div><span>Total Items</span><strong>{menuItems.length}</strong><small>Across all categories</small></div>
        </article>
        <article className="metric-card">
          <div className="metric-icon"><FiToggleRight /></div>
          <div><span>Available</span><strong>{visibleCount}</strong><small>Visible to customers</small></div>
        </article>
        <article className="metric-card">
          <div className="metric-icon"><FiToggleLeft /></div>
          <div><span>Hidden</span><strong>{hiddenCount}</strong><small>Not orderable now</small></div>
        </article>
        <article className="metric-card">
          <div className="metric-icon"><FiPlus /></div>
          <div><span>Categories</span><strong>{categories.length - 1}</strong><small>Menu groupings</small></div>
        </article>
      </section>

      <section className="management-grid">
        <div className="panel panel-large">
          <div className="panel-header">
            <div>
              <h2>Food Items</h2>
              <span>Manage what customers can order</span>
            </div>
          </div>

          <div className="management-toolbar">
            <div className="customer-search">
              <FiSearch />
              <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search menu items" />
            </div>
            <div className="category-tabs">
              {categories.map((category) => (
                <button
                  className={category === selectedCategory ? "category-tab active" : "category-tab"}
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="admin-card-grid">
            {filteredItems.map((item) => (
              <article className="admin-item-card" key={item.id}>
                <div className="admin-item-top">
                  <span>{item.category}</span>
                  <em className={item.status === "Available" ? "status-pill success" : "status-pill muted"}>{item.status}</em>
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="admin-item-meta">
                  <strong>${item.price.toFixed(2)}</strong>
                  <span>{item.prepTime}</span>
                  <span>{item.ordersToday} orders today</span>
                </div>
                <div className="admin-actions">
                  <button type="button" onClick={() => toggleAvailability(item.id)}>
                    {item.status === "Available" ? <FiToggleRight /> : <FiToggleLeft />} Toggle
                  </button>
                  <button type="button"><FiEdit3 /> Edit</button>
                  <button className="danger-action" type="button" onClick={() => removeItem(item.id)}><FiTrash2 /> Remove</button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="panel form-panel">
          <div className="panel-header">
            <div>
              <h2>Add Food</h2>
              <span>Create a customer-orderable item</span>
            </div>
          </div>
          <form className="order-form" onSubmit={addMenuItem}>
            <label className="field">
              <span>Food Name</span>
              <div className="input-shell">
                <MdRestaurantMenu />
                <input name="name" value={newItem.name} onChange={updateNewItem} placeholder="Pasta Alfredo" required />
              </div>
            </label>
            <label className="field">
              <span>Category</span>
              <select name="category" value={newItem.category} onChange={updateNewItem}>
                {categories.filter((category) => category !== "All").map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Price</span>
              <div className="input-shell">
                <span>$</span>
                <input name="price" type="number" min="0" step="0.01" value={newItem.price} onChange={updateNewItem} placeholder="12.50" required />
              </div>
            </label>
            <label className="field">
              <span>Preparation Time</span>
              <div className="input-shell">
                <input name="prepTime" value={newItem.prepTime} onChange={updateNewItem} placeholder="18 min" />
              </div>
            </label>
            <label className="field">
              <span>Description</span>
              <textarea name="description" value={newItem.description} onChange={updateNewItem} placeholder="Short menu description" required />
            </label>
            <button className="primary-button" type="submit">Add Food Item</button>
          </form>
        </aside>
      </section>
    </main>
  );
}

export default Menu;
