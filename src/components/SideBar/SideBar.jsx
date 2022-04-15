import "./sidebar.css";
import { Link } from "react-router-dom";
export const SideBar = () => {
  return (
    <ul className="sidebar-container list-style-none">
      <Link to="/" className="inline-item link-style-none text-md text-bold">
        <i className="fa-solid fa-house-chimney sidebar-icon margin-r"></i>Home
      </Link>
      <Link to="/explore" className="inline-item link-style-none text-md text-bold">
        <i className="fa-regular fa-compass sidebar-icon margin-r"></i>Explore
      </Link>
      <Link to="/playlist" className="inline-item link-style-none text-md text-bold">
        <i className="fa-solid fa-circle-play sidebar-icon margin-r"></i>Playlist
      </Link>
      <Link to="/liked" className="inline-item link-style-none text-md text-bold">
        <i className="fa-solid fa-thumbs-up sidebar-icon margin-r"></i>Liked
      </Link>
      <Link to="/watchlater" className="inline-item link-style-none text-md text-bold">
      <i className="fa-solid fa-clock sidebar-icon margin-r"></i>Watch Later
      </Link>
      <Link to="/history" className="inline-item link-style-none text-md text-bold">
        <i className="fa-solid fa-clock-rotate-left sidebar-icon margin-r"></i>History
      </Link>
    </ul>
  );
};
