import "./explorevideo.css";
import { useState } from "react";
import { SideBar } from "..";
import { useData } from "../../contexts";
import { Loader } from "../Loader/Loader";
import { useUserActions } from "../../hooks";
import { PlaylistModal } from "../PlaylistModal/PlaylistModal";
import { SaveToPlaylist } from "../ActionItems/SaveToPlaylist";
import { SaveWatchLater } from "../ActionItems/SaveWatchLater";

export const ExploreVideo = () => {
  const [loading, setLoading] = useState(false);
  const { data, id, setId } = useData();
  const { showSingleVideo } = useUserActions();

  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content video-list">
        {loading && <Loader loadtext={"Saving"} />}
        {data.videos.map((video) => {
          return (
            <div className="video-card" key={video._id}>
              <div
                className="video-image"
                onClick={() => showSingleVideo(video)}
              >
                <img
                  src={video.videoThumbnail}
                  alt="thumb"
                  className="img-responsive"
                />
              </div>

              <div className="video-details text-md text-bold">
                <div className="video-header">
                  <span className=" video-title text-justify">
                    {video.title}
                  </span>
                  <i
                    className="fa-solid fa-ellipsis-vertical options"
                    onClick={() => setId(id ? 0 : video._id)}
                  ></i>
                  {id === video._id && (
                    <span className="option-show">
                      <div className="video-options text-sm">
                        <PlaylistModal video={video} Id={id} />
                        <SaveToPlaylist />
                        <SaveWatchLater video={video} />
                      </div>
                    </span>
                  )}
                </div>
                <div className="video-footer text-sm">
                  <span>{video.creator}</span>
                  <span>{video.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
