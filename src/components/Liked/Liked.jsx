import { SideBar } from "../SideBar/SideBar";

export const Liked = () => {
  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content video-list"><h1>Liked</h1></div>
    </div>
  );
};
