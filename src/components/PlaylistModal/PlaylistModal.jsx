import { useUserActions } from "../../hooks";
import { useData } from "../../contexts";
import { useState } from "react";

export const PlaylistModal = ({ video }) => {
  const { addPlaylistVideos, addNewPlaylist } = useUserActions();
  const [playlistName, setPlaylistName] = useState("");
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const { data, setId, playlistModal, setPlaylistModal } = useData();
  return (
    <>
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
                  <div key={playlist._id}>
                    <div
                      className="option"
                      onClick={() =>
                        playlist.videos.some((v) => v._id === video._id)
                          ? window.alert("already present")
                          : (addPlaylistVideos(video, playlist._id),
                            setPlaylistModal(false),
                            setId(0))
                      }
                    >
                      {playlist.title}
                    </div>
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
    </>
  );
};
