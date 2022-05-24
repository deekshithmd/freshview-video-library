import { Navigate, useLocation } from "react-router-dom";
//import { useAuth } from "../../contexts";
import { useSelector } from "react-redux";

export const RequiresAuth = ({ children }) => {
  //const { isLoggedin } = useAuth();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace></Navigate>
  );
};
