import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SideBar } from "../SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts";
import {
  addWatchLater,
  deletePlaylistVideo,
  getPlaylistVideo,
  getPlaylists,
  deletePlaylist,
  addHistory,
} from "../../services";

export const PlaylistVideos = () => {
  const { playId } = useParams();
  const [id, setId] = useState();
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const navigate = useNavigate();
  const { data, dispatch } = useData();
  const token = localStorage.getItem("login");

  useEffect(() => {
    (async () => {
      const playlistResponse = await getPlaylistVideo({
        playlistId: playId,
        encodedToken: token,
      });
      console.log(playId);
      console.log("vres", playlistResponse);
      setPlaylistVideos(playlistResponse.data.playlist.videos);
    })();
  }, []);

  const showSingleVideo = (video) => {
    navigate(`/singlevideo/${video._id}`);
    addHistoryVideo(video);
  };

  const addHistoryVideo = async (video) => {
    const historyResponse = await addHistory({
      video: video,
      encodedToken: token,
    });
    dispatch({ type: "LOAD_HISTORY", payload: historyResponse.data.history });
  };

  const addWatchlater = async (video) => {
    setId(0);
    const watchlaterResponse = await addWatchLater({
      video: video,
      encodedToken: token,
    });
    dispatch({
      type: "LOAD_WATCHLATER",
      payload: watchlaterResponse.data.watchlater,
    });
  };

  const deleteFromPlaylist = async (videoId) => {
    const playlistdeleteResponse = await deletePlaylistVideo({
      playlistId: playId,
      videoId: videoId,
      encodedToken: token,
    });
    const playlistResponse = await getPlaylistVideo({
      playlistId: playId,
      encodedToken: token,
    });
    setPlaylistVideos(playlistResponse.data.playlist.videos);
    const playlistDataResponse = await getPlaylists({ encodedToken: token });
    dispatch({
      type: "LOAD_PLAYLIST",
      payload: playlistDataResponse.data.playlists,
    });
  };

  const deletePlayList = async (playlistId) => {
    const playlistResponse = await deletePlaylist({
      playlistId: playlistId,
      encodedToken: token,
    });
    dispatch({
      type: "LOAD_PLAYLIST",
      payload: playlistResponse.data.playlists,
    });
    navigate("/playlist");
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
                            onClick={() => addWatchlater(video)}
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
