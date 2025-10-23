import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ allowedRoles }) => {
  
  
  
  const { isAuth, role } = useSelector((state) => state.auth);

  if (!isAuth) {
    // if not logged in, redirect to login page
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // if logged in but not allowed
    return <Navigate to="/" replace />;
  }


  return <Outlet />;
};

export default ProtectedRoute;
