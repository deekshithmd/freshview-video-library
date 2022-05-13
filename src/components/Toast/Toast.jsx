import "./toast.css"
import { ToastContainer } from "react-toastify"
export const Toast=()=>{
    return(
        <ToastContainer
        autoClose={2000}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}/>  
    )
}