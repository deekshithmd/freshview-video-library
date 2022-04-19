import { useParams } from "react-router-dom";
import { getPlaylistVideo } from "../../services";
import { useEffect, useState } from "react";
import { SideBar } from "../SideBar/SideBar";
import { useNavigate } from "react-router-dom";

export const PlaylistVideos = () => {
  const { playId } = useParams();
  const [id, setId] = useState();
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("login");

  useEffect(() => {
    (async () => {
      const playlistResponse = await getPlaylistVideo({
        playlistId: playId,
        encodedToken: token,
      });
      console.log(playId)
      console.log("vres", playlistResponse);
      setPlaylistVideos(playlistResponse.data.playlist.videos);
    })();
  },[]);

  const showSingleVideo = (video) => {
    navigate(`/singlevideo/${video._id}`);
  };

  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content video-list">
        {playlistVideos.map((video) => {
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
                        <span className="option-item">Delete from Playlist</span>
                        <span className="option-item">Add Watch Later</span>
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
