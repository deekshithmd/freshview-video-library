import {
  SideBar,
  PlaylistModal,
  SaveToPlaylist,
  WatchLaterActions,
  Loader,
} from "..";
import { useData } from "../../contexts";
import { useUserActions } from "../../hooks";

export const History = () => {
  const { data, id, setId, loading, loadtext } = useData();
  const { deleteHistoryVideo, clearHistoryVideos, showSingleVideo } =
    useUserActions();

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
              {data?.history?.length > 0 ? (
                data.history.map((video) => (
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
                ))
              ) : (
                <h1>No Videos in History</h1>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
