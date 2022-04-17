import "./navigation.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";
export const Navigation = () => {
  const navigate = useNavigate();
  const { isLoggedin, setIsLoggedin } = useAuth();

  const logoutHandler = () => {
    setIsLoggedin(false);
    localStorage.removeItem("login");
    navigate("/");
  };

  return (
    <nav className="navigation-bar">
      <section className="brand logo">
        <Link to="/">
          <img
            src="https://i.postimg.cc/fR92NM3L/fresh.png"
            className="fresh-logo"
            alt="logo"
          />
        </Link>
        <span className="brand-text">FreshView</span>
      </section>
      <section className="search-item">
        <div className="input search-field outlined ">
          <button className="search-icon">
            <i className="fa fa-search"></i>
          </button>
          <input type="text" name="username" placeholder="Search here..." />
        </div>
      </section>
      <ul className="list-style-none account-data">
        {!isLoggedin && (
          <li className="list-inline-item">
            <Link to="/login" className="btn btn-solid-primary link-btn">
              Login
            </Link>
          </li>
        )}

        <Link to="/profile">
          <li className="list-inline-item">
            <div className="avatar avatar-xs">
              <img
                className="img-responsive img-round"
                src="https://i.postimg.cc/28Zcgq1j/avatar.png"
                alt="Avatar"
              />
            </div>
          </li>
        </Link>

        {isLoggedin && (
          <li className="list-inline-item">
            <button
              className="btn btn-icon-primary user-signout"
              onClick={logoutHandler}
            >
              <i className="fa fa-sign-out fa-2x"></i>
            </button>
          </li>
        )}

        <li className="list-inline-item">
          <span className="nav-icon-link link-style-none">
            <i className="fas fa-moon nav-icon"></i>
          </span>
        </li>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="burger-menu">
          <i className="fa-solid fa-bars"></i>
        </label>
      </ul>
    </nav>
  );
};
