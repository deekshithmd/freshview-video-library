import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useToast = () => {
  const successToast = (text) => toast.success(text);

  const infoToast = (text) => toast.info(text);

  const warningToast = (text) => toast.warn(text);

  const errorToast = (text) => toast.error(text);

  return {
    successToast,
    infoToast,
    warningToast,
    errorToast,
  };
};
