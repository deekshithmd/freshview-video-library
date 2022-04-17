import { SideBar } from "../SideBar/SideBar";

export const PlayList = () => {
  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content video-list"><h1>PlayList</h1></div>
    </div>
  );
};
