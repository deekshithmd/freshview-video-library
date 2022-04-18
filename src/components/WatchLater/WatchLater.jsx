import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteWatchLater } from "../../services";
import { SideBar } from "../SideBar/SideBar";
import { useData } from "../../contexts";

export const WatchLater = () => {
  const navigate = useNavigate();
  const [id, setId] = useState();
  const { data, dispatch } = useData();
  const token = localStorage.getItem("login");

  const showSingleVideo = (video) => {
    navigate(`/singlevideo/${video._id}`);
  };

  const deleteWatchlater = async (video) => {
    const watchRes = await deleteWatchLater({
      videoId: video._id,
      encodedToken: token,
    });
    dispatch({ type: "LOAD_WATCHLATER", payload: watchRes.data.watchlater });
  };

  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content video-list">
        {data.watchlater.map((video) => {
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
                        <span className="option-item">Save to Playlist</span>
                        <span
                          className="option-item"
                          onClick={() => deleteWatchlater(video)}
                        >
                          Remove Watch Later
                        </span>
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
