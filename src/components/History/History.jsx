import { useNavigate } from "react-router-dom";
import { SideBar } from "../SideBar/SideBar";
import { useData } from "../../contexts";
import { useUserActions } from "../../hooks";
import { PlaylistModal } from "../PlaylistModal/PlaylistModal";
import { SaveToPlaylist } from "../ActionItems/SaveToPlaylist";
import { WatchLaterActions } from "../ActionItems/WatchLaterActions";
import { Loader } from "../Loader/Loader";

export const History = () => {
  const { data, id, setId, loading, loadtext } = useData();
  const navigate = useNavigate();
  const { deleteHistoryVideo, clearHistoryVideos } = useUserActions();

  const showSingleVideo = (video) => {
    navigate(`/singlevideo/${video._id}`);
  };

  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content">
        {loading ? (
          <Loader text={loadtext} />
        ) : (
          <>
            <div className="section-header">
              <h2 className="playlist-name">History</h2>
              <button
                className="btn btn-solid-primary"
                onClick={() => clearHistoryVideos()}
              >
                Clear History
              </button>
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
                              <PlaylistModal video={video} Id={id} />
                              <SaveToPlaylist />
                              <WatchLaterActions video={video} />

                              <span
                                className="option-item"
                                onClick={() => {
                                  deleteHistoryVideo(video);
                                  setId(0);
                                }}
                              >
                                <i className="fa-solid fa-trash margin-r"></i>
                                Delete from History
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
          </>
        )}
      </div>
    </div>
  );
};
