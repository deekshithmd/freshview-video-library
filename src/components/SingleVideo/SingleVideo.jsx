import "./singlevideo.css";
import { Video, SideBar } from "..";
import { useParams } from "react-router-dom";
import { useData, useAuth } from "../../contexts";
import { useUserActions } from "../../hooks/userActions";
import { PlaylistModal } from "../PlaylistModal/PlaylistModal";
import { Loader } from "../Loader/Loader";
import { WatchLaterActions } from "../ActionItems/WatchLaterActions";
import { SaveToPlaylist } from "../ActionItems/SaveToPlaylist";
import { useNavigate } from "react-router-dom";

export const SingleVideo = () => {
  const navigate = useNavigate();
  const { videoId } = useParams();
  const { isLoggedin } = useAuth();
  const { data, setPlaylistModal, currentVideo, loading, id, setId, loadtext } =
    useData();
  const {
    addWatchlater,
    addLike,
    deleteLike,
    deleteWatchlater,
    showSingleVideo,
  } = useUserActions();
  const liked = data.liked.some((i) => i._id === videoId);
  const watch = data.watchlater.some((v) => v._id === videoId);
  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content">
        {loading ? (
          <Loader text={loadtext} />
        ) : (
          <div className="single-video-grid">
            <div className="video-container">
              <Video id={videoId} />
            </div>
            {data.videos.map((video) => {
              return (
                video._id === videoId && (
                  <div className="video-detail" key={video._id}>
                    <p className="text-lg text-bold l-h-0">{video.title}</p>
                    <div className="data-actions">
                      <div className="data text-md">
                        <span className="margin-r">
                          {parseInt(video.views / 1000)}K views
                        </span>
                        <span>{video.date}</span>
                      </div>
                      <div className="actions text-lg">
                        <span
                          className="action-item"
                          onClick={() =>
                            liked ? deleteLike(video) : addLike(video)
                          }
                        >
                          <i
                            className={
                              liked
                                ? "fa-solid fa-thumbs-up margin-r"
                                : "fa-regular fa-thumbs-up margin-r"
                            }
                          ></i>
                          {parseInt(video.likes / 1000)}K
                        </span>
                        <span className="action-item">
                          <i className="fa-solid fa-share margin-r"></i>Share
                        </span>
                        <PlaylistModal video={video} Id={video._id} />
                        <span
                          className="action-item"
                          onClick={() =>
                            setPlaylistModal((isShow) =>
                              isShow ? false : true
                            )
                          }
                        >
                          <i className="fa-regular fa-circle-play margin-r"></i>
                          Save
                        </span>

                        <span
                          className="action-item"
                          onClick={() =>
                            watch
                              ? deleteWatchlater(video)
                              : addWatchlater(video)
                          }
                        >
                          <i
                            className={
                              watch
                                ? "fa-solid fa-trash margin-r"
                                : "fa-regular fa-clock margin-r"
                            }
                          ></i>
                          {watch ? "from Watch Later" : "Add Watch Later"}
                        </span>
                      </div>
                    </div>
                    <p className="text-md text-bold">{video.creator}</p>
                    <span className="text-md">Description:</span>
                    <p className="text-md text-left text-justify">
                      {video.description}
                    </p>
                    <span className="text-md margin-b text-bold">Comments</span>
                    <div className="add-comment">
                      <div
                        className="avatar avatar-text-xs avatar-text img-round text-md text-bold margin-r"
                        role="img"
                        alt="Avatar"
                      >
                        MD
                      </div>
                      <input
                        className="input standard"
                        type="text"
                        placeholder="Type your comment"
                      />
                      <button className="btn btn-solid-primary margin-l">
                        Comment
                      </button>
                    </div>
                    <div className="show-comment">
                      <div className="user-avatar margin-r">
                        <div
                          className="avatar avatar-text-xs avatar-text img-round text-md text-bold"
                          role="img"
                          alt="Avatar"
                        >
                          MD
                        </div>
                      </div>

                      <div className="user-comment">
                        <span className="text-md text-bold">Deekshith M D</span>
                        <span className="comment-text text-md text-justify">
                          This video gave complete information about farming
                          techniques required to get succcess in this crop
                        </span>
                      </div>
                    </div>
                  </div>
                )
              );
            })}
            <div className="suggested-list">
              <p className="text-md text-bold">Recommended Videos...</p>
              {data.videos.map((video) => {
                return (
                  video._id !== videoId &&
                  video.categoryName === currentVideo.categoryName && (
                    <div className="video-card margin-b" key={video._id}>
                      <div className="video-image">
                        <img
                          src={video.videoThumbnail}
                          alt="thumb"
                          className="img-responsive"
                          onClick={() => showSingleVideo(video)}
                        />
                      </div>
                      <div className="video-details text-md text-bold">
                        <div className="video-header">
                          <span className=" video-title text-justify">
                            {video.title}
                          </span>
                          <i
                            className="fa-solid fa-ellipsis-vertical options"
                            onClick={() =>
                              isLoggedin
                                ? setId(id ? 0 : video._id)
                                : navigate("/login")
                            }
                          ></i>
                          {id === video._id && (
                            <span className="option-show">
                              <div className="video-options text-sm">
                                <PlaylistModal video={video} Id={id} />
                                <SaveToPlaylist />
                                <WatchLaterActions video={video} />
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
                  )
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
