import { SideBar } from "../SideBar/SideBar";

export const WatchLater = () => {
  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content video-list"><h1>WatchLater Videos</h1></div>
    </div>
  );
};
