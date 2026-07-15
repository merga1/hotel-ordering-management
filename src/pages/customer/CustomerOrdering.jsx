import { useMemo, useState } from "react";
import { FiMinus, FiPlus, FiSearch, FiShoppingBag, FiTrash2, FiUser } from "react-icons/fi";
import { MdOutlineRestaurantMenu, MdTableBar } from "react-icons/md";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const categories = ["All", "Breakfast", "Mains", "Grill", "Drinks", "Desserts"];

const menuItems = [
  {
    id: 1,
    name: "Swahili Breakfast Plate",
    category: "Breakfast",
    price: 9.5,
    prepTime: "12 min",
    badge: "Popular",
    description: "Mandazi, eggs, sausage, fruit, and spiced tea.",
  },
  {
    id: 2,
    name: "Chicken Biryani",
    category: "Mains",
    price: 14.75,
    prepTime: "22 min",
    badge: "Chef pick",
    description: "Aromatic rice, tender chicken, raita, and kachumbari.",
  },
  {
    id: 3,
    name: "Grilled Tilapia",
    category: "Grill",
    price: 17.25,
    prepTime: "25 min",
    badge: "Fresh",
    description: "Whole tilapia with lemon butter, ugali, and greens.",
  },
  {
    id: 4,
    name: "Beef Burger Deluxe",
    category: "Mains",
    price: 12.9,
    prepTime: "18 min",
    badge: "Fast",
    description: "House patty, cheddar, caramelized onions, and fries.",
  },
  {
    id: 5,
    name: "Passion Mint Cooler",
    category: "Drinks",
    price: 4.8,
    prepTime: "5 min",
    badge: "Cold",
    description: "Passion fruit, mint, lime, and sparkling water.",
  },
  {
    id: 6,
    name: "Chocolate Lava Cake",
    category: "Desserts",
    price: 7.4,
    prepTime: "14 min",
    badge: "Sweet",
    description: "Warm chocolate cake with vanilla ice cream.",
  },
];

const formatCurrency = (value) => `$${value.toFixed(2)}`;

function CustomerOrdering() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    tableNumber: "",
    customerName: "",
    phone: "",
    notes: "",
  });

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch = `${item.name} ${item.description}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const serviceFee = cart.length > 0 ? 1.25 : 0;
  const total = subtotal + serviceFee;

  const updateCustomerInfo = (event) => {
    const { name, value } = event.target;
    setCustomerInfo((currentInfo) => ({ ...currentInfo, [name]: value }));
  };

  const addToCart = (menuItem) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === menuItem.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...currentCart, { ...menuItem, quantity: 1 }];
    });
    toast.success(`${menuItem.name} added`);
  };

  const changeQuantity = (itemId, direction) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.id !== itemId) {
            return item;
          }

          return { ...item, quantity: item.quantity + direction };
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (itemId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== itemId));
  };

  const submitOrder = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      toast.error("Add at least one item to your order");
      return;
    }

    if (!customerInfo.tableNumber.trim()) {
      toast.error("Enter your table number");
      return;
    }

    toast.success(`Order sent for table ${customerInfo.tableNumber}`);
    setCart([]);
    setCustomerInfo({ tableNumber: "", customerName: "", phone: "", notes: "" });
  };

  return (
    <main className="customer-order-page">
      <section className="customer-hero">
        <div>
          <p className="eyebrow">QR Table Ordering</p>
          <h1>Browse the restaurant menu and order from your table.</h1>
          <p>
            Choose food, drinks, or desserts, then share your table number so the kitchen and wait staff know where to serve you.
          </p>
        </div>
        <div className="customer-hero-card">
          <MdOutlineRestaurantMenu />
          <strong>Table service</strong>
          <span>Average kitchen time: 18 minutes</span>
        </div>
      </section>

      <section className="customer-order-shell">
        <div className="menu-browser">
          <div className="customer-toolbar">
            <div className="customer-search">
              <FiSearch />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search meals, drinks, desserts"
              />
            </div>
            <div className="category-tabs" aria-label="Menu categories">
              {categories.map((category) => (
                <button
                  className={category === selectedCategory ? "category-tab active" : "category-tab"}
                  type="button"
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="customer-menu-grid">
            {filteredItems.map((item, index) => (
              <motion.article
                className="food-card"
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: index * 0.03 }}
              >
                <div className="food-card-top">
                  <span>{item.category}</span>
                  <em>{item.badge}</em>
                </div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <div className="food-meta">
                  <strong>{formatCurrency(item.price)}</strong>
                  <span>{item.prepTime}</span>
                </div>
                <button className="add-cart-button" type="button" onClick={() => addToCart(item)}>
                  <FiPlus /> Add
                </button>
              </motion.article>
            ))}
          </div>
        </div>

        <aside className="order-panel">
          <div className="order-panel-header">
            <div>
              <p className="eyebrow">Your Order</p>
              <h2>Cart and table details</h2>
            </div>
            <span className="cart-count">{cart.reduce((count, item) => count + item.quantity, 0)}</span>
          </div>

          <div className="cart-list">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <FiShoppingBag />
                <strong>Your cart is empty</strong>
                <span>Add items from the restaurant menu.</span>
              </div>
            ) : (
              cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{formatCurrency(item.price)} each</span>
                  </div>
                  <div className="quantity-control">
                    <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity">
                      <FiMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity">
                      <FiPlus />
                    </button>
                  </div>
                  <button className="remove-item" type="button" onClick={() => removeItem(item.id)} aria-label="Remove item">
                    <FiTrash2 />
                  </button>
                </div>
              ))
            )}
          </div>

          <form className="order-form" onSubmit={submitOrder}>
            <label className="field">
              <span>Table Number</span>
              <div className="input-shell">
                <MdTableBar />
                <input
                  name="tableNumber"
                  value={customerInfo.tableNumber}
                  onChange={updateCustomerInfo}
                  placeholder="Example: 12"
                  required
                />
              </div>
            </label>

            <label className="field">
              <span>Name</span>
              <div className="input-shell">
                <FiUser />
                <input
                  name="customerName"
                  value={customerInfo.customerName}
                  onChange={updateCustomerInfo}
                  placeholder="Optional"
                />
              </div>
            </label>

            <label className="field">
              <span>Phone Number</span>
              <div className="input-shell">
                <FiUser />
                <input
                  name="phone"
                  value={customerInfo.phone}
                  onChange={updateCustomerInfo}
                  placeholder="Optional for updates"
                />
              </div>
            </label>

            <label className="field">
              <span>Special Instructions</span>
              <textarea
                name="notes"
                value={customerInfo.notes}
                onChange={updateCustomerInfo}
                placeholder="Allergies, spice level, no onions, extra cutlery"
              />
            </label>

            <div className="order-total">
              <span>Subtotal</span>
              <strong>{formatCurrency(subtotal)}</strong>
              <span>Service fee</span>
              <strong>{formatCurrency(serviceFee)}</strong>
              <span>Total</span>
              <strong>{formatCurrency(total)}</strong>
            </div>

            <button className="primary-button" type="submit">
              Place Order
            </button>
          </form>
        </aside>
      </section>
    </main>
  );
}

export default CustomerOrdering;
