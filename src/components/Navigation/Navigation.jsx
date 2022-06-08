import "./navigation.css";
import { Link, useLocation } from "react-router-dom";
import { useData } from "../../contexts";
import { SideBar } from "..";
import { Toast } from "..";
import { useUserActions } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../app/Slices/themeSlice";

export const Navigation = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { showMini, setShowMini } = useData();
  const { getFiltered } = useUserActions();
  const location = useLocation();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  let debounce = (callback, delay) => {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(
        () => callback.call(this, { query: arguments[0] }),
        delay
      );
    };
  };

  let searchVideo = debounce((searchQuery) => getFiltered(searchQuery), 400);

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
        {location.pathname === "/explore" && (
          <section className="search-item">
            <div className="input search-field outlined ">
              <button className="search-icon">
                <i className="fa fa-search"></i>
              </button>
              <input
                type="text"
                name="username"
                placeholder="Search here..."
                onChange={(e) => searchVideo(e.target.value)}
              />
            </div>
          </section>
        )}
        <ul className="list-style-none account-data">
          {!isLoggedIn && (
            <li className="list-inline-item">
              <Link to="/login" className="btn btn-solid-primary link-btn">
                Login
              </Link>
            </li>
          )}

          {isLoggedIn && (
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
                onClick={() => dispatch(toggle())}
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
