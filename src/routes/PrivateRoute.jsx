import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuthenticated = true;

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;