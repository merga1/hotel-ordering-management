import { NavLink } from "react-router-dom";
import {
  FiBarChart2,
  FiBell,
  FiCalendar,
  FiCreditCard,
  FiGift,
  FiGrid,
  FiHome,
  FiLogOut,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { MdKitchen, MdOutlineQrCode2, MdRestaurantMenu, MdTableBar } from "react-icons/md";

const navSections = [
  {
    items: [{ label: "Dashboard", icon: FiHome, to: "/dashboard" }],
  },
  {
    label: "Menu Management",
    icon: MdRestaurantMenu,
    items: [
      { label: "Categories", to: "/menu" },
      { label: "Food Items", to: "/menu" },
      { label: "Add Food", to: "/menu" },
    ],
  },
  {
    label: "Orders",
    icon: FiGrid,
    items: [
      { label: "Pending", to: "/orders" },
      { label: "Preparing", to: "/orders" },
      { label: "Ready", to: "/orders" },
      { label: "Completed", to: "/orders" },
      { label: "Cancelled", to: "/orders" },
    ],
  },
  {
    label: "Tables",
    icon: MdTableBar,
    items: [
      { label: "All Tables", to: "/tables" },
      { label: "QR Codes", to: "/tables" },
      { label: "Table Status", to: "/tables" },
    ],
  },
  {
    items: [
      { label: "Kitchen", icon: MdKitchen, to: "/orders" },
      { label: "Customers", icon: FiUsers, to: "/customers" },
      { label: "Reservations", icon: FiCalendar, to: "/tables" },
      { label: "Payments", icon: FiCreditCard, to: "/payments" },
      { label: "Promotions", icon: FiGift, to: "/reports" },
      { label: "Reports", icon: FiBarChart2, to: "/reports" },
      { label: "Notifications", icon: FiBell, to: "/dashboard" },
      { label: "Staff", icon: MdOutlineQrCode2, to: "/settings" },
      { label: "Settings", icon: FiSettings, to: "/settings" },
      { label: "Profile", icon: FiUsers, to: "/settings" },
    ],
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark">
          <MdRestaurantMenu />
        </span>
        <div>
          <strong>TableTap</strong>
          <small>Admin Panel</small>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Dashboard navigation">
        {navSections.map((section, sectionIndex) => {
          const SectionIcon = section.icon;

          return (
            <div className="nav-section" key={section.label || sectionIndex}>
              {section.label && (
                <div className="nav-heading">
                  <SectionIcon />
                  <span>{section.label}</span>
                </div>
              )}
              {section.items.map((item) => {
                const ItemIcon = item.icon;

                return (
                  <NavLink className="nav-link" to={item.to} key={`${sectionIndex}-${item.label}`}>
                    {ItemIcon && <ItemIcon />}
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          );
        })}
      </nav>

      <NavLink className="logout-link" to="/">
        <FiLogOut />
        <span>Logout</span>
      </NavLink>
    </aside>
  );
}

export default Sidebar;
