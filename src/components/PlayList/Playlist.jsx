import "./playlist.css";
import { SideBar } from "../SideBar/SideBar";
import { useData } from "../../contexts";
import { useState } from "react";
import { useUserActions } from "../../hooks";
import { Loader } from "../Loader/Loader";

export const PlayList = () => {
  const { data, loading, loadtext } = useData();
  const [playlistModal, setPlaylistModal] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const { deletePlayList, addNewPlaylist, showPlaylistVideos } =
    useUserActions();

  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content">
        {loading ? (
          <Loader text={loadtext} />
        ) : (
          <>
            <div className="section-header">
              <h2 className="playlist-name">Playlists</h2>

              {playlistModal && (
                <div className="modal-container">
                  <div className="modal">
                    <section className="modal-header">
                      <p className="text-md text-bold">Playlists</p>
                      <i
                        className="fa-solid fa-xmark text-xl"
                        onClick={() => setPlaylistModal(false)}
                      ></i>
                    </section>
                    <section className="modal-content text-sm">
                      {data.playlist.length > 0 ? (
                        data.playlist.map((playlist) => (
                          <div key={playlist._id} className="option">
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
                            onChange={(e) => setPlaylistName(e.target.value)}
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
              <button
                className="btn btn-solid-primary"
                onClick={() =>
                  setPlaylistModal((isShow) => (isShow ? false : true))
                }
              >
                Create New Playlist
              </button>
            </div>
            <div className=" video-list">
              {data.playlist.length > 0 ? (
                data.playlist.map((playlist) => {
                  return (
                    <div className="video-card" key={playlist._id}>
                      <div className="video-image">
                        {playlist.videos.length === 0 ? (
                          <>
                            <img
                              src="https://i.postimg.cc/9FVzRyR4/video-thumbnail.jpg"
                              alt="thumb"
                              className="img-responsive video-thumbnail"
                              onClick={() => showPlaylistVideos(playlist._id)}
                            />
                            <div className="half-block">
                              <img
                                src="https://www.svgrepo.com/show/340848/playlist.svg"
                                alt=""
                              />
                              <span className="text-2xl">
                                {playlist.videos.length}
                              </span>
                            </div>
                            <div className="delete">
                              <img
                                src="https://www.svgrepo.com/show/352601/trash.svg"
                                alt=""
                                onClick={() => deletePlayList(playlist._id)}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <img
                              src={playlist.videos[0].videoThumbnail}
                              alt="thumb"
                              className="img-responsive video-thumbnail"
                              onClick={() => showPlaylistVideos(playlist._id)}
                            />
                            <div className="half-block">
                              <img
                                src="https://www.svgrepo.com/show/340848/playlist.svg"
                                alt=""
                              />
                              <span className="text-xl">
                                {playlist.videos.length}
                              </span>
                            </div>
                            <div className="delete">
                              <img
                                src="https://www.svgrepo.com/show/352601/trash.svg"
                                alt=""
                                onClick={() => deletePlayList(playlist._id)}
                              />
                            </div>
                          </>
                        )}
                      </div>
                      <span className="text-xl playlist-title text-bold">
                        {playlist.title}
                      </span>
                    </div>
                  );
                })
              ) : (
                <h1>No playlist created</h1>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
