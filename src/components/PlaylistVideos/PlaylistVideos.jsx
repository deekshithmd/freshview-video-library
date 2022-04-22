import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SideBar } from "../SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts";
import {
  deletePlaylistVideo,
  getPlaylistVideo,
  getPlaylists,
} from "../../services";
import { useUserActions } from "../../hooks";

export const PlaylistVideos = () => {
  const { playId } = useParams();
  const [id, setId] = useState();
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const { dispatch } = useData();
  const token = localStorage.getItem("login");
  const { addWatchlater, deletePlayList, showSingleVideo } = useUserActions();

  useEffect(() => {
    (async () => {
      const playlistResponse = await getPlaylistVideo({
        playlistId: playId,
        encodedToken: token,
      });
      setPlaylistVideos(playlistResponse.data.playlist.videos);
    })();
  }, []);

  const deleteFromPlaylist = async (videoId) => {
    const playlistdeleteResponse = await deletePlaylistVideo({
      playlistId: playId,
      videoId: videoId,
      encodedToken: token,
    });

    setPlaylistVideos(playlistdeleteResponse.data.playlist?.videos);
    
    const playlistDataResponse = await getPlaylists({ encodedToken: token });
    dispatch({
      type: "LOAD_PLAYLIST",
      payload: playlistDataResponse.data.playlists,
    });
  };

  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content ">
        <div className="section-header">
          <h2 className="playlist-name">PlaylistName</h2>
          <button
            className="btn btn-solid-primary"
            onClick={() => deletePlayList(playId)}
          >
            Delete Playlist
          </button>
        </div>
        <div className="video-list">
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
                          <span
                            className="option-item"
                            onClick={() => deleteFromPlaylist(video._id)}
                          >
                            Delete from Playlist
                          </span>
                          <span
                            className="option-item"
                            onClick={() => {
                              addWatchlater(video);
                              setId(0);
                            }}
                          >
                            Add Watch Later
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