import "./singlevideo.css";
import { Video, SideBar } from "..";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../contexts";
import {
  addLikedVideo,
  addWatchLater,
  deleteLikedVideo,
  deleteWatchLater,
} from "../../services";

export const SingleVideo = () => {
  const { videoId } = useParams();
  const { data, dispatch } = useData();
  const navigate = useNavigate();
  const token = localStorage.getItem("login");
  const liked = data.liked.some((i) => i._id === videoId);
  const watch = data.watchlater.some((v) => v._id === videoId);

  const addLike = async (video) => {
    const likeRes = await addLikedVideo({ video: video, encodedToken: token });
    dispatch({ type: "LOAD_LIKED", payload: likeRes.data.likes });
  };

  const addWatchlater = async (video) => {
    const watchRes = await addWatchLater({ video: video, encodedToken: token });
    dispatch({ type: "LOAD_WATCHLATER", payload: watchRes.data.watchlater });
  };

  const deleteLike = async (video) => {
    const likeRes = await deleteLikedVideo({
      videoId: video._id,
      encodedToken: token,
    });
    dispatch({ type: "LOAD_LIKED", payload: likeRes.data.likes });
  };

  const deleteWatchlater = async (video) => {
    const watchRes = await deleteWatchLater({
      videoId: video._id,
      encodedToken: token,
    });
    dispatch({ type: "LOAD_WATCHLATER", payload: watchRes.data.watchlater });
  };

  const showSingleVideo = (video) => {
    navigate(`/singlevideo/${video._id}`);
  };

  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content">
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
                      <span className="action-item">
                        <i className="fa-regular fa-circle-play margin-r"></i>
                        Save
                      </span>

                      <span
                        className="action-item"
                        onClick={() =>
                          watch ? deleteWatchlater(video) : addWatchlater(video)
                        }
                      >
                        <i
                          className={
                            watch
                              ? "fa-solid fa-trash margin-r"
                              : "fa-regular fa-clock margin-r"
                          }
                        ></i>
                        {watch ? "Remove from Watch Later" : "Add Watch Later"}
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
                      placeholder="Type your commentt"
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
                video._id !== videoId && (
                  <div
                    className="video-card"
                    key={video._id}
                    onClick={() => showSingleVideo(video)}
                  >
                    <div className="video-image">
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
                        <i className="fa-solid fa-ellipsis-vertical options"></i>
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
      </div>
    </div>
  );
};
