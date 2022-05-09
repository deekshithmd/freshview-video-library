import "../SideBar/sidebar.css";
import { NavLink } from "react-router-dom";

export const SideBarItem = ({ link }) => {
  const activeStyle = {
    border: "2px solid var(--primary-color)",
    backgroundColor: "var(--hover-color)",
    color: "var(--primary-color)",
    borderRadius: "10px",
  };

  return (
    <NavLink
      to={`/${link.path}`}
      style={({ isActive }) => (isActive ? activeStyle : undefined)}
      className="inline-item link-style-none text-md text-bold"
    >
      <i className={`${link.icon} sidebar-icon margin-r`}></i>
      <span className="page-name">
        {link.page}
      </span>
    </NavLink>
  );
};
