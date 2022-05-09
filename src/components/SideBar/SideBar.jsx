import "./sidebar.css";
import { v4 as uuid } from "uuid";
import { SideBarItem } from "..";

export const SideBar = () => {
  const addresses = [
    {
      _id: uuid(),
      page: "Home",
      path: "",
      icon: "fa-solid fa-house-chimney",
    },
    {
      _id: uuid(),
      page: "Explore",
      path: "explore",
      icon: "fa-regular fa-compass",
    },
    {
      _id: uuid(),
      page: "Playlist",
      path: "playlist",
      icon: "fa-solid fa-circle-play",
    },
    {
      _id: uuid(),
      page: "Liked",
      path: "liked",
      icon: "fa-solid fa-thumbs-up",
    },
    {
      _id: uuid(),
      page: "Watch Later",
      path: "watchlater",
      icon: "fa-solid fa-clock ",
    },
    {
      _id: uuid(),
      page: "History",
      path: "history",
      icon: "fa-solid fa-clock-rotate-left ",
    },
  ];

  return (
    <ul className="sidebar-container list-style-none">
      {addresses.map((link) => (
        <SideBarItem link={link} key={link._id} />
      ))}
    </ul>
  );
};
