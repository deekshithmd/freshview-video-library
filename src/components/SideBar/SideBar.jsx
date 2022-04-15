import "./sidebar.css";
import { NavLink } from "react-router-dom";
export const SideBar = () => {
  const activeStyle = {
    color: "var(--secondary-color)",
  };

  return (
    <ul className="sidebar-container list-style-none">
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ?activeStyle : undefined)}
        className="inline-item link-style-none text-md text-bold"
      >
        <i className="fa-solid fa-house-chimney sidebar-icon margin-r"></i>Home
      </NavLink>
      <NavLink
        to="/explore"
        style={({ isActive }) => (isActive ?activeStyle : undefined)}
        className="inline-item link-style-none text-md text-bold"
      >
        <i className="fa-regular fa-compass sidebar-icon margin-r"></i>Explore
      </NavLink>
      <NavLink
        to="/playlist"
        style={({ isActive }) => (isActive ?activeStyle : undefined)}
        className="inline-item link-style-none text-md text-bold"
      >
        <i className="fa-solid fa-circle-play sidebar-icon margin-r"></i>
        Playlist
      </NavLink>
      <NavLink
        to="/liked"
        style={({ isActive }) => (isActive ?activeStyle : undefined)}
        className="inline-item link-style-none text-md text-bold"
      >
        <i className="fa-solid fa-thumbs-up sidebar-icon margin-r"></i>Liked
      </NavLink>
      <NavLink
        to="/watchlater"
        style={({ isActive }) => (isActive ?activeStyle : undefined)}
        className="inline-item link-style-none text-md text-bold"
      >
        <i className="fa-solid fa-clock sidebar-icon margin-r"></i>Watch Later
      </NavLink>
      <NavLink
        to="/history"
        style={({ isActive }) => (isActive ?activeStyle : undefined)}
        className="inline-item link-style-none text-md text-bold"
      >
        <i className="fa-solid fa-clock-rotate-left sidebar-icon margin-r"></i>
        History
      </NavLink>
    </ul>
  );
};
