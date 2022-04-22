import "./explorevideo.css";
import { useState } from "react";
import { SideBar } from "..";
import { useData } from "../../contexts";
import { Loader } from "../Loader/Loader";
import { useUserActions } from "../../hooks";

export const ExploreVideo = () => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const [playlistModal, setPlaylistModal] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const { data } = useData();
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const { addWatchlater, showSingleVideo, addPlaylistVideos, addNewPlaylist } =
    useUserActions();

  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content video-list">
        {loading && <Loader loadtext={"Saving"} />}
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
                                        setPlaylistModal(false);
                                        setId(0);
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
                                      onClick={() => {
                                        addNewPlaylist(playlistName);
                                        setCreatePlaylist(false);
                                      }}
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
  );
};
