import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import DashboardLayout from "../components/layout/DashboardLayout";
import CustomerOrdering from "../pages/customer/CustomerOrdering";
import Dashboard from "../pages/dashboard/Dashboard";
import Menu from "../pages/menu/Menu";
import Orders from "../pages/orders/Orders";
import Tables from "../pages/tables/Tables";
import Customers from "../pages/customers/Customers";
import Payments from "../pages/payments/Payments";
import Reports from "../pages/reports/Reports";
import Settings from "../pages/settings/Settings";

import NotFound from "../pages/errors/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/order" element={<CustomerOrdering />} />
      <Route path="/qr-order" element={<CustomerOrdering />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
