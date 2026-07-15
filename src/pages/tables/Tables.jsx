import { useMemo, useState } from "react";
import { FiDownload, FiLink, FiRefreshCw, FiSearch } from "react-icons/fi";
import { MdOutlineQrCode2, MdTableBar } from "react-icons/md";
import toast from "react-hot-toast";

const initialTables = [
  { id: 1, name: "Table 01", seats: 2, zone: "Window", status: "Available", activeOrder: "None" },
  { id: 2, name: "Table 02", seats: 4, zone: "Main Hall", status: "Occupied", activeOrder: "ORD-1245" },
  { id: 3, name: "Table 03", seats: 4, zone: "Main Hall", status: "Reserved", activeOrder: "7:30 PM" },
  { id: 4, name: "Table 04", seats: 6, zone: "Patio", status: "Occupied", activeOrder: "ORD-1247" },
  { id: 5, name: "Table 05", seats: 2, zone: "Patio", status: "Cleaning", activeOrder: "Clearing" },
  { id: 12, name: "Table 12", seats: 4, zone: "Private Wing", status: "Occupied", activeOrder: "ORD-1248" },
  { id: 18, name: "Table 18", seats: 8, zone: "Family Area", status: "Occupied", activeOrder: "ORD-1246" },
  { id: 21, name: "Table 21", seats: 2, zone: "Bar", status: "Available", activeOrder: "None" },
];

const statuses = ["All", "Available", "Occupied", "Reserved", "Cleaning"];

function QrPreview({ tableId }) {
  const blocks = Array.from({ length: 49 }, (_, index) => (index * tableId + index + tableId) % 3 !== 0);

  return (
    <div className="qr-preview" aria-label={`QR preview for table ${tableId}`}>
      {blocks.map((isFilled, index) => <span className={isFilled ? "filled" : ""} key={index} />)}
    </div>
  );
}

function Tables() {
  const [tables, setTables] = useState(initialTables);
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const orderBaseUrl = "http://127.0.0.1:5173/order";

  const filteredTables = useMemo(() => {
    return tables.filter((table) => {
      const matchesStatus = activeStatus === "All" || table.status === activeStatus;
      const matchesSearch = `${table.name} ${table.zone} ${table.activeOrder}`.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [tables, activeStatus, searchTerm]);

  const counts = statuses.reduce((summary, status) => {
    summary[status] = status === "All" ? tables.length : tables.filter((table) => table.status === status).length;
    return summary;
  }, {});

  const changeStatus = (tableId, status) => {
    setTables((currentTables) => currentTables.map((table) => table.id === tableId ? { ...table, status } : table));
    toast.success(`Table ${tableId} set to ${status}`);
  };

  const copyQrLink = async (tableId) => {
    const link = `${orderBaseUrl}?table=${tableId}`;

    try {
      await navigator.clipboard.writeText(link);
      toast.success("QR order link copied");
    } catch {
      toast.success(link);
    }
  };

  return (
    <main className="dashboard-content management-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Table & QR Management</p>
          <h1>Manage seating, table status, and QR ordering links</h1>
        </div>
        <button className="secondary-button" type="button"><FiRefreshCw /> Regenerate QR Codes</button>
      </section>

      <section className="summary-grid compact-summary">
        <article className="metric-card"><div className="metric-icon"><MdTableBar /></div><div><span>All Tables</span><strong>{counts.All}</strong><small>Configured tables</small></div></article>
        <article className="metric-card"><div className="metric-icon"><MdTableBar /></div><div><span>Available</span><strong>{counts.Available}</strong><small>Ready for guests</small></div></article>
        <article className="metric-card"><div className="metric-icon"><MdTableBar /></div><div><span>Occupied</span><strong>{counts.Occupied}</strong><small>Serving now</small></div></article>
        <article className="metric-card"><div className="metric-icon"><MdOutlineQrCode2 /></div><div><span>QR Codes</span><strong>{tables.length}</strong><small>One per table</small></div></article>
      </section>

      <section className="panel">
        <div className="management-toolbar">
          <div className="customer-search">
            <FiSearch />
            <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search table, zone, order" />
          </div>
          <div className="category-tabs">
            {statuses.map((status) => (
              <button className={status === activeStatus ? "category-tab active" : "category-tab"} type="button" key={status} onClick={() => setActiveStatus(status)}>
                {status} ({counts[status]})
              </button>
            ))}
          </div>
        </div>

        <div className="table-management-grid">
          {filteredTables.map((table) => (
            <article className="table-management-card" key={table.id}>
              <QrPreview tableId={table.id} />
              <div className="table-card-content">
                <div className="order-title-row">
                  <div>
                    <h2>{table.name}</h2>
                    <span>{table.zone} • {table.seats} seats</span>
                  </div>
                  <em className={`status-pill ${table.status.toLowerCase()}`}>{table.status}</em>
                </div>
                <p>Active: {table.activeOrder}</p>
                <code>{`/order?table=${table.id}`}</code>
                <div className="admin-actions">
                  <button type="button" onClick={() => copyQrLink(table.id)}><FiLink /> Copy Link</button>
                  <button type="button"><FiDownload /> Download</button>
                </div>
                <div className="status-controls">
                  {statuses.filter((status) => status !== "All").map((status) => (
                    <button className={status === table.status ? "active" : ""} type="button" key={status} onClick={() => changeStatus(table.id, status)}>
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Tables;
