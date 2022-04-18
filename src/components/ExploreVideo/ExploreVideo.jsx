import "./explorevideo.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SideBar } from "..";
import { useData } from "../../contexts";
import {
  addWatchLater,
  addHistory,
  addPlaylist,
  addPlaylistVideo,
  getPlaylists,
} from "../../services";

export const ExploreVideo = () => {
  const [id, setId] = useState();
  const [playlistModal, setPlaylistModal] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const { data, dispatch } = useData();
  const navigate = useNavigate();
  const token = localStorage.getItem("login");

  const showSingleVideo = (video) => {
    addHistoryVideo(video);
    navigate(`/singlevideo/${video._id}`);
  };

  const addNewPlaylist = async (playlistName) => {
    const playlistResponse = await addPlaylist({
      title: playlistName,
      encodedToken: token,
    });
    dispatch({
      type: "LOAD_PLAYLIST",
      payload: playlistResponse.data.playlists,
    });
  };

  const addPlaylistVideos = async (video, playlistId) => {
    setPlaylistModal(false);
    setId(0);
    const response = await addPlaylistVideo({
      video: video,
      playlistId: playlistId,
      encodedToken: token,
    });
    console.log("play", response);
    const playlistResponse = await getPlaylists({ encodedToken: token });
    dispatch({
      type: "LOAD_PLAYLIST",
      payload: playlistResponse.data.playlists,
    });
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

  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content video-list">
        {data.videos.map((video) => {
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
                        {playlistModal && (
                          <div className="modal-container">
                            <div className="modal">
                              <section className="modal-header">
                                <p className="text-md text-bold">Playlists</p>
                                <i
                                  className="fa-solid fa-xmark text-xl"
                                  onClick={() => {
                                    setPlaylistModal(false);
                                    setId(0);
                                  }}
                                ></i>
                              </section>
                              <section className="modal-content text-sm">
                                {data.playlist.length > 0 ? (
                                  data.playlist.map((playlist) => (
                                    <div
                                      key={playlist._id}
                                      className="option"
                                      onClick={() => {
                                        addPlaylistVideos(video, playlist._id);
                                      }}
                                    >
                                      {playlist.title}
                                    </div>
                                  ))
                                ) : (
                                  <h3>No playlists</h3>
                                )}
                              </section>
                              <section className="modal-actions">
                                <input
                                  className="input standard"
                                  type="text"
                                  placeholder="Enter playlist name"
                                  onChange={(e) =>
                                    setPlaylistName(e.target.value)
                                  }
                                />
                                <button
                                  className="btn btn-solid-primary"
                                  onClick={() => addNewPlaylist(playlistName)}
                                >
                                  Add PlayList
                                </button>
                              </section>
                            </div>
                          </div>
                        )}

                        <span
                          className="option-item"
                          onClick={() =>
                            setPlaylistModal((isShow) =>
                              isShow ? false : true
                            )
                          }
                        >
                          Save to Playlist
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
  );
};