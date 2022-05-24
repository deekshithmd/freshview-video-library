import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const RequiresAuth = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace></Navigate>
  );
};
