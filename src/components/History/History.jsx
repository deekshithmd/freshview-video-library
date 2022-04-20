import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SideBar } from "../SideBar/SideBar";
import { useData } from "../../contexts";
import { addWatchLater, clearHistory, deleteHistory } from "../../services";

export const History = () => {
  const { data, dispatch } = useData();
  const [id, setId] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("login");

  const showSingleVideo = (video) => {
    navigate(`/singlevideo/${video._id}`);
  };

  const deleteHisoryVideo = async (video) => {
    setId(0);
    const historyResponse = await deleteHistory({
      videoId: video._id,
      encodedToken: token,
    });
    dispatch({ type: "LOAD_HISTORY", payload: historyResponse.data.history });
  };

  const addWatchlater = async (video) => {
    setId(0);
    const watchRes = await addWatchLater({ video: video, encodedToken: token });
    dispatch({ type: "LOAD_WATCHLATER", payload: watchRes.data.watchlater });
  };

  const clearHistoryVideos = async (token) => {
    const historyResponse = await clearHistory({ encodedToken: token });
    dispatch({ type: "LOAD_HISTORY", payload: historyResponse.data.history });
  };

  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content">
        <div className="section-header">
          <h2 className="playlist-name">History</h2>
          <button className="btn btn-solid-primary" onClick={()=>clearHistoryVideos(token)}>Clear History</button>
        </div>
        <div className="video-list">
          {data.history.map((video) => {
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
                            onClick={() => addWatchlater(video)}
                          >
                            Add Watch Later
                          </span>
                          <span
                            className="option-item"
                            onClick={() => deleteHisoryVideo(video)}
                          >
                            Delete History
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
    </div>
  );
};
