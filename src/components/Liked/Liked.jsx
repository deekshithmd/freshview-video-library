import { SideBar } from "../SideBar/SideBar";
import { useData } from "../../contexts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addHistory,
  addPlaylist,
  addPlaylistVideo,
  getPlaylists,
  deleteLikedVideo,
} from "../../services";

export const Liked = () => {
  const navigate = useNavigate();
  const [playlistModal, setPlaylistModal] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const [id, setId] = useState();
  const { data, dispatch } = useData();
  const token = localStorage.getItem("login");

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

  const addNewPlaylist = async (playlistName) => {
    setCreatePlaylist(false);
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
    const playlistResponse = await getPlaylists({ encodedToken: token });
    dispatch({
      type: "LOAD_PLAYLIST",
      payload: playlistResponse.data.playlists,
    });
  };

  const deleteLike = async (video) => {
    const likeResponse = await deleteLikedVideo({
      videoId: video._id,
      encodedToken: token,
    });
    dispatch({ type: "LOAD_LIKED", payload: likeResponse.data.likes });
  };

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
          {data.liked.map((video) => {
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
                                          addPlaylistVideos(
                                            video,
                                            playlist._id
                                          );
                                        }}
                                      >
                                        {playlist.title}
                                      </div>
                                    ))
                                  ) : (
                                    <h4>No playlists Created</h4>
                                  )}
                                </section>
                                <section className="modal-actions">
                                  {createPlaylist && (
                                    <>
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
                                        onClick={() =>
                                          addNewPlaylist(playlistName)
                                        }
                                      >
                                        Create
                                      </button>
                                    </>
                                  )}
                                  {!createPlaylist && (
                                    <button
                                      className="btn btn-solid-primary"
                                      onClick={() => setCreatePlaylist(true)}
                                    >
                                      Create Playlist
                                    </button>
                                  )}
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
                          <span className="option-item">
                            Add to Watch Later
                          </span>
                          <span
                            className="option-item"
                            onClick={() => deleteLike(video)}
                          >
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
            );
          })}
        </div>
      </div>
    </div>
  );
};
