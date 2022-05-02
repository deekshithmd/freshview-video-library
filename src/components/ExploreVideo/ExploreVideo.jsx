import "./explorevideo.css";
import { SideBar } from "..";
import { useData } from "../../contexts";
import { useUserActions } from "../../hooks";
import { PlaylistModal } from "../PlaylistModal/PlaylistModal";
import { SaveToPlaylist } from "../ActionItems/SaveToPlaylist";
import { WatchLaterActions } from "../ActionItems/WatchLaterActions";
import { Filter } from "../ActionItems/Filter";
import { Loader } from "../Loader/Loader";

export const ExploreVideo = () => {
  const { data, id, setId, loading } = useData();
  const { showSingleVideo } = useUserActions();

  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <>
        <div className="content">
          <Filter />
          {loading && <Loader text="Loading..."/>}
          <div className="video-list">
            {data.filtered.map((video) => {
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
      </>
    </div>
  );
};
