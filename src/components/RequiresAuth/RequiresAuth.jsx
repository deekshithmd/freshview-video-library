import { Navigate, useLocation } from "react-router-dom";
//import { useAuth } from "../../contexts";
import { useSelector } from "react-redux";

export const RequiresAuth = ({ children }) => {
  //const { isLoggedin } = useAuth();
  const { isLoggedin } = useSelector((state) => state.auth);
  const location = useLocation();
  return isLoggedin ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace></Navigate>
  );
};
