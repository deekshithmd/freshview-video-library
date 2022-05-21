import "./toast.css";
import { ToastContainer } from "react-toastify";
export const Toast = () => {
  return (
    <ToastContainer
      className="toast-position"
      autoClose={1000}
      closeOnClick
      pauseOnFocusLoss={false}
      pauseOnHover={false}
    />
  );
};
