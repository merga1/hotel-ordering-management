import { useMemo, useState } from "react";
import { FiCheckCircle, FiClock, FiCreditCard, FiSearch, FiXCircle } from "react-icons/fi";
import toast from "react-hot-toast";

const statusFlow = ["Pending", "Preparing", "Ready", "Completed"];
const filters = ["All", "Pending", "Preparing", "Ready", "Completed", "Cancelled"];

const initialOrders = [
  {
    id: "ORD-1248",
    table: "Table 12",
    customer: "Amina K.",
    phone: "+254 700 123 456",
    status: "Pending",
    payment: "Unpaid",
    time: "2 min ago",
    notes: "No onions, mild spice",
    items: ["Chicken Biryani x2", "Passion Mint Cooler x2"],
    total: 39.1,
  },
  {
    id: "ORD-1247",
    table: "Table 04",
    customer: "James N.",
    phone: "+254 711 222 333",
    status: "Preparing",
    payment: "Paid",
    time: "9 min ago",
    notes: "Serve drinks first",
    items: ["Grilled Tilapia x1", "Chocolate Lava Cake x1"],
    total: 24.65,
  },
  {
    id: "ORD-1246",
    table: "Table 18",
    customer: "Walk-in",
    phone: "",
    status: "Ready",
    payment: "Paid",
    time: "14 min ago",
    notes: "Extra cutlery",
    items: ["Beef Burger Deluxe x3"],
    total: 38.7,
  },
  {
    id: "ORD-1245",
    table: "Table 02",
    customer: "M. Otieno",
    phone: "+254 722 000 111",
    status: "Completed",
    payment: "Paid",
    time: "31 min ago",
    notes: "Receipt requested",
    items: ["Swahili Breakfast Plate x2", "Coffee x2"],
    total: 25.0,
  },
];

const getNextStatus = (status) => {
  const currentIndex = statusFlow.indexOf(status);
  return currentIndex >= 0 ? statusFlow[currentIndex + 1] : undefined;
};

function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = activeFilter === "All" || order.status === activeFilter;
      const matchesSearch = `${order.id} ${order.table} ${order.customer}`.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [orders, activeFilter, searchTerm]);

  const counts = filters.reduce((summary, filter) => {
    summary[filter] = filter === "All" ? orders.length : orders.filter((order) => order.status === filter).length;
    return summary;
  }, {});

  const updateStatus = (orderId, status) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) => (order.id === orderId ? { ...order, status } : order)),
    );
    toast.success(`${orderId} moved to ${status}`);
  };

  return (
    <main className="dashboard-content management-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Order Management</p>
          <h1>Track table orders from request to payment</h1>
        </div>
        <button className="secondary-button" type="button">Print Kitchen List</button>
      </section>

      <section className="summary-grid compact-summary">
        <article className="metric-card"><div className="metric-icon"><FiClock /></div><div><span>Pending</span><strong>{counts.Pending}</strong><small>Awaiting confirmation</small></div></article>
        <article className="metric-card"><div className="metric-icon"><FiClock /></div><div><span>Preparing</span><strong>{counts.Preparing}</strong><small>In kitchen queue</small></div></article>
        <article className="metric-card"><div className="metric-icon"><FiCheckCircle /></div><div><span>Ready</span><strong>{counts.Ready}</strong><small>Needs serving</small></div></article>
        <article className="metric-card"><div className="metric-icon"><FiCreditCard /></div><div><span>Completed</span><strong>{counts.Completed}</strong><small>Closed orders</small></div></article>
      </section>

      <section className="panel">
        <div className="management-toolbar">
          <div className="customer-search">
            <FiSearch />
            <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search order, table, customer" />
          </div>
          <div className="category-tabs">
            {filters.map((filter) => (
              <button className={filter === activeFilter ? "category-tab active" : "category-tab"} type="button" key={filter} onClick={() => setActiveFilter(filter)}>
                {filter} ({counts[filter]})
              </button>
            ))}
          </div>
        </div>

        <div className="order-management-list">
          {filteredOrders.map((order) => {
            const nextStatus = getNextStatus(order.status);

            return (
              <article className="order-management-card" key={order.id}>
                <div className="order-card-main">
                  <div className="order-title-row">
                    <div>
                      <h2>{order.id}</h2>
                      <span>{order.table} • {order.customer || "Guest"} • {order.time}</span>
                    </div>
                    <em className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</em>
                  </div>
                  <ul className="order-items-list">
                    {order.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <p>{order.notes}</p>
                </div>

                <div className="order-card-side">
                  <strong>${order.total.toFixed(2)}</strong>
                  <span>{order.payment}</span>
                  <span>{order.phone || "No phone provided"}</span>
                  <div className="admin-actions vertical-actions">
                    {nextStatus && <button type="button" onClick={() => updateStatus(order.id, nextStatus)}><FiCheckCircle /> Mark {nextStatus}</button>}
                    {order.status !== "Cancelled" && order.status !== "Completed" && (
                      <button className="danger-action" type="button" onClick={() => updateStatus(order.id, "Cancelled")}><FiXCircle /> Cancel</button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Orders;
