import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const PublicRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  
  if (authUser) {
    return <Navigate to="/" replace />;
  }
  
  return children ? children : <Outlet />;
};

export default PublicRoute;
