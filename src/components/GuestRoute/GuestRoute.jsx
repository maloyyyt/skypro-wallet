import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function GuestRoute() {
  const { token } = useAuth();
  return token ? <Navigate to="/" replace /> : <Outlet />;
}

export default GuestRoute;
