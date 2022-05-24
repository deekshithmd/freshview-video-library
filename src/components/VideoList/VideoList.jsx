import { PlaylistModal, SaveToPlaylist, WatchLaterActions } from "..";
import { useData } from "../../contexts";
import { useUserActions } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function VideoList() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { data, id, setId } = useData();
  const { showSingleVideo } = useUserActions();
  const navigate = useNavigate();

  return (
    <div className="video-list">
      {data.filtered.map((video) => (
        <div className="video-card" key={video._id}>
          <div className="video-image" onClick={() => showSingleVideo(video)}>
            <img
              src={video.videoThumbnail}
              alt="thumb"
              className="img-responsive"
            />
          </div>

          <div className="video-details text-md text-bold">
            <div className="video-header">
              <span className=" video-title text-justify">{video.title}</span>
              <i
                className="fa-solid fa-ellipsis-vertical options"
                onClick={() =>
                  isLoggedIn ? setId(id ? 0 : video._id) : navigate("/login")
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
      ))}
    </div>
  );
}
