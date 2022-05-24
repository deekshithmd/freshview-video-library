import "../Signup/authentication.css";
import axios from "axios";
import { getTestData, getCredentials } from "../../utils";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { loginUser } from "../../app/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks";

export const Login = () => {
  const { isLoggedIn,loginError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    isLoggedIn && navigate(location?.state?.from?.pathname || "/");
  }, [isLoggedIn]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    dispatch(loginUser(getCredentials(email, password)));
  };

  return (
    <div className="home-container">
      <div className="form">
        <div className="form-data">
          {loginError && <h3>Invalid Credentials</h3>}
          <h2 className="margin-b">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input input-labeled outlined margin">
              <label className="label">Enter Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="user@freshview.com"
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
            className="btn btn-outline-primary auth-btn margin"
            onClick={() => dispatch(loginUser(getTestData()))}
          >
            Guest Login
          </button>
          <p className="text-lg">
            <Link to="/signup" className=" link-style-none text-bold">
              Create New Account?
              <i className="fa fa-angle-right margin-l"></i>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
