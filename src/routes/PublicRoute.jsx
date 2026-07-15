import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const isAuthenticated = false;

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    children
  );
}

export default PublicRoute;