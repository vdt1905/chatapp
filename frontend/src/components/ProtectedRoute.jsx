import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
