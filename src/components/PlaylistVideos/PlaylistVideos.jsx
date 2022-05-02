import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SideBar } from "../SideBar/SideBar";
import { useData } from "../../contexts";
import { WatchLaterActions } from "../ActionItems/WatchLaterActions";
import { Loader } from "../Loader/Loader";
import {
  deletePlaylistVideo,
  getPlaylistVideo,
  getPlaylists,
} from "../../services";
import { useUserActions } from "../../hooks";

export const PlaylistVideos = () => {
  const { playId } = useParams();
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const { dispatch, loading, setLoading, id, setId, loadtext, setLoadText } =
    useData();
  const token = localStorage.getItem("login");
  const { deletePlayList, showSingleVideo } = useUserActions();
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setLoadText("Loading...");
      const playlistResponse = await getPlaylistVideo({
        playlistId: playId,
        encodedToken: token,
      });
      setPlaylistName(playlistResponse.data.playlist.title);
      setPlaylistVideos(playlistResponse.data.playlist.videos);
      setLoading(false);
    })();
  }, []);

  const deleteFromPlaylist = async (videoId) => {
    setLoading(true);
    setLoadText("Removing...");
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
    setLoading(false);
  };

  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content ">
        {loading ? (
          <Loader text={loadtext} />
        ) : (
          <>
            <div className="section-header">
              <h2 className="playlist-name">{playlistName}</h2>
              <button
                className="btn btn-solid-primary"
                onClick={() => deletePlayList(playId)}
              >
                Delete Playlist
              </button>
            </div>
            <div className="video-list">
              {playlistVideos.length > 0 ? (
                playlistVideos.map((video) => {
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
                                  onClick={() => {
                                    deleteFromPlaylist(video._id);
                                    setId(0);
                                  }}
                                >
                                  <i className="fa-solid fa-trash margin-r"></i>
                                  Delete from Playlist
                                </span>
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
                })
              ) : (
                <h1>No videos added to this playlist</h1>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
