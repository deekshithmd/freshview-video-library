import { useUserActions } from "../../hooks";
import { useData } from "../../contexts";
import { useSelector } from "react-redux";
import { useState } from "react";
import { deletePlaylistVideo, getPlaylists } from "../../services";

export const PlaylistModal = ({ video }) => {
  const { token } = useSelector((state) => state.auth);
  const { addPlaylistVideos, addNewPlaylist } = useUserActions();
  const [playlistName, setPlaylistName] = useState("");
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const {
    data,
    dispatch,
    setId,
    playlistModal,
    setPlaylistModal,
    setLoadText,
    setLoading,
  } = useData();

  const deleteFromPlaylist = async (video, playId) => {
    setLoading(true);
    setLoadText("Removing...");
    const playlistdeleteResponse = await deletePlaylistVideo({
      playlistId: playId,
      videoId: video._id,
      encodedToken: token,
    });

    const playlistDataResponse = await getPlaylists({ encodedToken: token });
    dispatch({
      type: "LOAD_PLAYLIST",
      payload: playlistDataResponse.data.playlists,
    });
    setLoading(false);
  };

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
            <section className="modal-content text-md">
              {data.playlist.length > 0 ? (
                data.playlist.map((playlist) => (
                  <div key={playlist._id}>
                    <label>
                      <input
                        type="checkbox"
                        className="margin"
                        checked={playlist.videos.some(
                          (v) => v._id === video._id
                        )}
                        onChange={() => {
                          playlist.videos.some((v) => v._id === video._id)
                            ? (deleteFromPlaylist(video, playlist._id),
                              setPlaylistModal(false),
                              setId(0))
                            : (addPlaylistVideos(video, playlist._id),
                              setPlaylistModal(false),
                              setId(0));
                        }}
                      />
                      {playlist.title}
                    </label>
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
