import "./error.css"
import { Link } from "react-router-dom";
export const Error=()=>{
  return (
    <div className="error flex">
      <h1>404 !!! Your page not found...</h1>
      <Link to="/" className="text-md">Click here to go to homepage</Link>
    </div>
  );
};
