import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ allowedRoles }) => {
  
  
  const token = Cookies.get("token");
  const { isAuth, userRole } = useSelector((state) => state.auth);

  if (!isAuth || !token) {
    // if not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // if logged in but not allowed
    return <Navigate to="/unauthorized" replace />;
  }

  // else render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
