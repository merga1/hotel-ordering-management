import { FiBell, FiMenu, FiSearch } from "react-icons/fi";

function Navbar() {
  return (
    <header className="dashboard-navbar">
      <button className="icon-button mobile-menu" type="button" aria-label="Open menu">
        <FiMenu />
      </button>

      <div className="search-box">
        <FiSearch />
        <input type="search" placeholder="Search orders, tables, customers" />
      </div>

      <div className="navbar-actions">
        <button className="icon-button" type="button" aria-label="Notifications">
          <FiBell />
          <span className="notification-dot" />
        </button>
        <div className="user-chip">
          <span>MO</span>
          <div>
            <strong>Merga Owner</strong>
            <small>Restaurant Admin</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
