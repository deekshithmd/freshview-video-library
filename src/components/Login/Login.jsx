import "../Signup/authentication.css";
import { getTestData } from "../../utils";
import axios from "axios";
import { useAuth } from "../../contexts";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { useState } from "react";

export const Login = () => {
  const { setIsLoggedin,setToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);

  const testLogin = async () => {
    try {
      console.log(getTestData());
      const response = await axios.post("/api/auth/login", getTestData());
      if (response.data.encodedToken) {
        localStorage.setItem(
          "login",
          JSON.stringify(response.data.encodedToken)
        );
        setToken(localStorage.getItem("login"))
        setIsLoggedin(true);
        navigate(location?.state?.from?.pathname || "/");
      }
    } catch (e) {
      setError(true);
      navigate("/login");
    }
  };

  return (
    <div className="home-container">
      <div className="form">
        <div className="form-data">
          {error && <h3>Wrong credentials</h3>}
          <h2 className="margin-b">Login</h2>
          <form>
            <div className="input input-labeled outlined margin">
              <label className="label">Enter Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="freshview@gmail.com"
              />
            </div>
            <div className="input input-labeled outlined margin">
              <label className="label">Enter Password</label>
              <input type="password" name="password" placeholder="******" />
            </div>
            <section className="handle">
              <label className="text-md">
                <input type="checkbox" className="margin-r" name="remember" />
                Remember me
              </label>
              <Link
                to="/forgot"
                className="text-md forgot-pwd text-primary margin-l"
              >
                Forgot password?
              </Link>
            </section>
            <input
              type="submit"
              className="btn btn-solid-primary auth-btn margin margiin-l-3-5"
              value="Login" 
            />
          </form>
          <button
            className="btn btn-solid-primary auth-btn margin"
            onClick={() => testLogin()}
          >
            Guest Login
          </button>
          <p className="text-lg">
            <Link to="/signup" className=" link-style-none">
              Create New Account?
              <i className="fa fa-angle-right margin-l"></i>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
