import "../Signup/authentication.css";
import axios from "axios";
import { getTestData, getCredentials } from "../../utils";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts";

export const Login = () => {
  const { setIsLoggedin, setUserData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);

  const testLogin = async () => {
    try {
      const response = await axios.post("/api/auth/login", getTestData());
      if (response.data.encodedToken) {
        localStorage.setItem(
          "login",
          JSON.stringify(response.data.encodedToken)
        );
        localStorage.setItem("user", JSON.stringify(response.data.foundUser));
        setUserData(response.data.foundUser);
        setIsLoggedin(true);
        navigate(location?.state?.from?.pathname || "/");
      }
    } catch (e) {
      setError(true);
      navigate("/login");
    }
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const { email, password } = event.target.elements;
      const response = await axios.post(
        "/api/auth/login",
        getCredentials(email, password)
      );
      if (response.data.encodedToken) {
        localStorage.setItem(
          "login",
          JSON.stringify(response.data.encodedToken)
        );
        setUserData(response.data.foundUser);
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
          <form onSubmit={handleLogin}>
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
