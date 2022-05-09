import "./authentication.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordValue, setPasswordvalue] = useState();
  const [confirm, setConfirm] = useState();

  const handleSignup = async (event) => {
    try {
      event.preventDefault();
      const { firstname, lastname, email, pass } = event.target.elements;
      console.log()
      const response = await axios.post(`/api/auth/signup`, {
        firstName: firstname.value,
        lastName: lastname.value,
        email: email.value,
        password: pass.value,
      });
      if (response.data.encodedToken) {
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.encodedToken)
        );
        navigate("/login");
      }
    } catch (e) {
      console.error(e);
    }
  };

  function checkEmail(e) {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    regEmail.test(e.target.value) ? setEmail(true) : setEmail(false);
  }

  function checkPassword(e) {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    strongRegex.test(e.target.value) ? setPassword(true) : setPassword(false);
    setPasswordvalue(e.target.value);
  }

  function confirmPassword(e) {
    e.target.value === passwordValue ? setConfirm(true) : setConfirm(false);
  }

  return (
    <div className="form">
      <div className="form-data">
        <h2 className="margin-b">SignUp</h2>
        <form onSubmit={handleSignup}>
          <div className="input input-labeled outlined margin">
            <label className="label">First Name</label>
            <input
              type="text"
              name="firstname"
              placeholder="Enter First Name"
              required
            />
          </div>
          <div className="input input-labeled outlined margin">
            <label className="label">Last Name</label>
            <input
              type="text"
              name="lastname"
              placeholder="Enter Last Name"
              required
            />
          </div>
          <div className="input input-labeled outlined margin">
            <label className="label">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="freshbuy@gmail.com"
              onMouseLeave={checkEmail}
              required
            />
          </div>
          <div className="form-input-message margin-l">
            {email === false && (
              <span className="input-validation error-msg">
                <span className="message-icon">
                  <i className="fa fa-exclamation-circle"></i>
                </span>
                Please Enter Email in correct format
              </span>
            )}
            {email === true && (
              <span className="input-validation success-msg">
                <span className="message-icon">
                  <i className="fa fa-check-circle"></i>
                </span>
                Correct Email format
              </span>
            )}
          </div>
          <div className="input input-labeled outlined margin">
            <label className="label">Password</label>
            <input
              type="password"
              name="pass"
              placeholder="******"
              onMouseLeave={checkPassword}
              required
            />
          </div>
          <div className="form-input-message text-justify margin-l">
            {password === false && (
              <span className="input-validation error-msg">
                <span className="message-icon">
                  <i className="fa fa-exclamation-circle"></i>
                </span>
                Please enter strong password with atleast 1 Uppercase,1
                Lowercase,1 Numeric Character and 1 special character
              </span>
            )}
            {password === true && (
              <span className="input-validation success-msg">
                <span className="message-icon">
                  <i className="fa fa-check-circle"></i>
                </span>
                Strong Password
              </span>
            )}
          </div>
          <div className="input input-labeled outlined margin">
            <label className="label">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              placeholder="******"
              onChange={confirmPassword}
              required
            />
          </div>
          <div className="form-input-message text-justify margin-l">
            {confirm === false && (
              <span className="input-validation error-msg">
                <span className="message-icon">
                  <i className="fa fa-exclamation-circle"></i>
                </span>
                Not Matched
              </span>
            )}
            {confirm === true && (
              <span className="input-validation success-msg">
                <span className="message-icon">
                  <i className="fa fa-check-circle"></i>
                </span>
                Matched
              </span>
            )}
          </div>
          <section className="handle">
            <label className="text-md">
              <input type="checkbox" className="margin-r" />I Accept all terms
              and conditions
            </label>
          </section>
          <input
            type="submit"
            className="btn btn-solid-primary auth-btn margin margin-l-3-3"
            value="SignUp"
          />
        </form>
      </div>
    </div>
  );
};
