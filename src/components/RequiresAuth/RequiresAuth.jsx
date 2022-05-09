import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts";

export const RequiresAuth = ({ children }) => {
  const { isLoggedin } = useAuth();
  const location = useLocation();
  return isLoggedin ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace></Navigate>
  );
};
