import {
  SideBar,
  PlaylistModal,
  SaveToPlaylist,
  WatchLaterActions,
  Loader,
} from "..";
import { useData } from "../../contexts";
import { useUserActions } from "../../hooks/userActions";

export const Liked = () => {
  const { data, id, setId, loading, loadtext } = useData();
  const { showSingleVideo, deleteLike } = useUserActions();

  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content ">
        <div className="section-header">
          <h2 className="playlist-name">Liked Videos</h2>
        </div>
        <div className="video-list">
          {loading ? (
            <Loader text={loadtext} />
          ) : data?.liked?.length > 0 ? (
            data.liked.map((video) => (
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
                              deleteLike(video);
                              setId(0);
                            }}
                          >
                            <i className="fa-solid fa-trash margin-r"></i>
                            Remove from Liked
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
            <h1>0 Video Liked by You</h1>
          )}
        </div>
      </div>
    </div>
  );
};
