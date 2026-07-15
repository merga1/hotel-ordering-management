import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";
import { MdTableBar } from "react-icons/md";

const summaryCards = [
  { label: "Today's Orders", value: "128", detail: "+12% from yesterday", icon: FiShoppingBag },
  { label: "Today's Revenue", value: "$4,820", detail: "86 paid orders", icon: FiDollarSign },
  { label: "Pending Orders", value: "14", detail: "Needs confirmation", icon: FiClock },
  { label: "Preparing Orders", value: "19", detail: "Kitchen in progress", icon: FiClock },
  { label: "Completed Orders", value: "95", detail: "74% completion rate", icon: FiCheckCircle },
  { label: "Available Tables", value: "22", detail: "Ready for guests", icon: MdTableBar },
  { label: "Occupied Tables", value: "18", detail: "72 covers active", icon: MdTableBar },
  { label: "Customers Today", value: "211", detail: "31 returning guests", icon: FiUsers },
];

const weeklySales = [
  { day: "Mon", sales: 2800 },
  { day: "Tue", sales: 3200 },
  { day: "Wed", sales: 3900 },
  { day: "Thu", sales: 3600 },
  { day: "Fri", sales: 4800 },
  { day: "Sat", sales: 6200 },
  { day: "Sun", sales: 5400 },
];

const monthlyRevenue = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 48000 },
  { month: "Mar", revenue: 52000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 68000 },
  { month: "Jun", revenue: 73000 },
];

const ordersByStatus = [
  { name: "Pending", value: 14, color: "#f59e0b" },
  { name: "Preparing", value: 19, color: "#0ea5e9" },
  { name: "Ready", value: 8, color: "#8b5cf6" },
  { name: "Completed", value: 95, color: "#16a34a" },
];

const popularFoods = [
  { item: "Grilled Tilapia", orders: 42 },
  { item: "Chicken Biryani", orders: 38 },
  { item: "Beef Burger", orders: 31 },
  { item: "Pasta Alfredo", orders: 26 },
];

const peakHours = [
  { hour: "10 AM", orders: 11 },
  { hour: "12 PM", orders: 37 },
  { hour: "2 PM", orders: 29 },
  { hour: "6 PM", orders: 46 },
  { hour: "8 PM", orders: 53 },
];

const recentOrders = [
  { id: "#ORD-1248", table: "Table 12", customer: "Amina K.", total: "$84.20", status: "Preparing" },
  { id: "#ORD-1247", table: "Table 04", customer: "James N.", total: "$41.00", status: "Ready" },
  { id: "#ORD-1246", table: "Table 18", customer: "Walk-in", total: "$58.75", status: "Pending" },
];

const activityLists = [
  {
    title: "Latest Payments",
    items: ["$84.20 card payment received", "$31.50 mobile payment received", "$112.00 cash bill closed"],
  },
  {
    title: "Latest Reservations",
    items: ["7:30 PM - Kamau party of 6", "8:00 PM - Patio table for 2", "Tomorrow - Private room booking"],
  },
  {
    title: "Recent Customers",
    items: ["Amina K. returned today", "12 new QR sessions started", "31 loyalty customers served"],
  },
  {
    title: "Kitchen Queue",
    items: ["7 mains in preparation", "4 orders ready for pickup", "2 allergy notes need review"],
  },
];

function Dashboard() {
  return (
    <main className="dashboard-content">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Dashboard Overview</p>
          <h1>Today&apos;s restaurant operations</h1>
        </div>
        <button className="secondary-button" type="button">
          Export Report
        </button>
      </section>

      <section className="summary-grid">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="metric-card" key={card.label}>
              <div className="metric-icon">
                <Icon />
              </div>
              <div>
                <span>{card.label}</span>
                <strong>{card.value}</strong>
                <small>{card.detail}</small>
              </div>
            </article>
          );
        })}
      </section>

      <section className="chart-grid">
        <article className="panel panel-large">
          <div className="panel-header">
            <h2>Weekly Sales</h2>
            <span>This week</span>
          </div>
          <ResponsiveContainer width="100%" height={270}>
            <LineChart data={weeklySales}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </article>

        <article className="panel">
          <div className="panel-header">
            <h2>Orders by Status</h2>
            <span>Live mix</span>
          </div>
          <ResponsiveContainer width="100%" height={270}>
            <PieChart>
              <Pie data={ordersByStatus} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92}>
                {ordersByStatus.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </article>

        <article className="panel">
          <div className="panel-header">
            <h2>Monthly Revenue</h2>
            <span>6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>

        <article className="panel">
          <div className="panel-header">
            <h2>Most Ordered Foods</h2>
            <span>Today</span>
          </div>
          <div className="rank-list">
            {popularFoods.map((food, index) => (
              <div className="rank-row" key={food.item}>
                <span>{index + 1}</span>
                <strong>{food.item}</strong>
                <em>{food.orders} orders</em>
              </div>
            ))}
          </div>
        </article>

        <article className="panel panel-large">
          <div className="panel-header">
            <h2>Peak Ordering Hours</h2>
            <span>Dining demand</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={peakHours}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#f97316" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>
      </section>

      <section className="operations-grid">
        <article className="panel panel-large">
          <div className="panel-header">
            <h2>Recent Orders</h2>
            <span>Newest activity</span>
          </div>
          <div className="orders-table">
            {recentOrders.map((order) => (
              <div className="table-row" key={order.id}>
                <strong>{order.id}</strong>
                <span>{order.table}</span>
                <span>{order.customer}</span>
                <span>{order.total}</span>
                <em>{order.status}</em>
              </div>
            ))}
          </div>
        </article>

        {activityLists.map((list) => (
          <article className="panel compact-panel" key={list.title}>
            <div className="panel-header">
              <h2>{list.title}</h2>
            </div>
            <ul className="activity-list">
              {list.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Dashboard;
