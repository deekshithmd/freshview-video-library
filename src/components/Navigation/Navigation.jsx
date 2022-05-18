import "./navigation.css";
import { Link } from "react-router-dom";
import { useAuth, useData, useTheme } from "../../contexts";
import { SideBar } from "..";
import { Toast } from "..";

export const Navigation = () => {
  const { isLoggedin } = useAuth();
  const { showMini, setShowMini } = useData();
  const { theme, toggle } = useTheme();
  return (
    <>
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

          {isLoggedin && (
            <>
              <Link to="/profile">
                <li className="list-inline-item profile">
                  <div className="avatar avatar-xs">
                    <img
                      className="img-responsive img-round"
                      src="https://i.postimg.cc/28Zcgq1j/avatar.png"
                      alt="Avatar"
                    />
                  </div>
                </li>
              </Link>
            </>
          )}

          <li className="list-inline-item">
            <span className="nav-icon-link link-style-none">
              <i
                className={
                  theme === "light-theme"
                    ? "fas fa-moon nav-icon"
                    : "fas fa-sun nav-icon"
                }
                onClick={() => toggle()}
              ></i>
            </span>
          </li>
          <label className="burger-menu" onClick={() => setShowMini(!showMini)}>
            <i className="fa-solid fa-bars"></i>
          </label>
          {showMini && (
            <div className="mini-sidebar">
              <SideBar />
            </div>
          )}
        </ul>
      </nav>
      <Toast />
    </>
  );
};
