import "../SideBar/sidebar.css";
import { NavLink } from "react-router-dom";
import { useData } from "../../contexts";

export const SideBarItem = ({ link }) => {
  const { showMini, setShowMini } = useData();
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
      <span className="page-name" onClick={() => setShowMini(!showMini)}>
        {link.page}
      </span>
    </NavLink>
  );
};
