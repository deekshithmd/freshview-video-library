import { Link } from "react-router-dom";
import { useData } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  addWatchLater,
  addHistory,
  addPlaylist,
  addPlaylistVideo,
  getPlaylists,
} from "../../services";
import "./home.css";
export const Home = () => {
  const [id, setId] = useState();
  const [playlistModal, setPlaylistModal] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const token = localStorage.getItem("login");
  const navigate = useNavigate();
  const { data, dispatch } = useData();
  let i = 0;

  const showSingleVideo = (video) => {
    addHistoryVideo(video);
    navigate(`/singlevideo/${video._id}`);
  };

  const addNewPlaylist = async (playlistName) => {
    const playRes = await addPlaylist({
      title: playlistName,
      encodedToken: token,
    });
    dispatch({ type: "LOAD_PLAYLIST", payload: playRes.data.playlists });
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
    <div className="home-container">
      <div className="banner-container margin-b">
        <div className="banner">
          <div className="banner-image">
            <img
              src="https://i.postimg.cc/V6b3XtCs/globalagriculture.jpg"
              alt="banner"
            />
          </div>
          <div className="banner-content-container">
            <div className="banner-content">
              <h1 className="banner-heading">
                Courses on Different Farming Practices...
              </h1>
              <h3 className="banner-sub-heading">
                Are you ready to explore...?
              </h3>

              <i className="fa-solid fa-angles-down arrow-down margin-b"></i>
              <button
                className="banner-btn"
                onClick={() => navigate("/explore")}
              >
                Explore Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="home-category-heading">
        <h3>Featured Categories</h3>
        <Link to="/explore" className="text-lg text-bold link-style-none ">
          See all <i className="fa-solid fa-angles-right"></i>
        </Link>
      </div>
      <div className="course-categories margin-t">
        {data.categories.map((category) => {
          i++;
          return (
            i < 6 && (
              <Link
                to="/explore"
                className="link-style-none"
                key={category._id}
              >
                <div className="category-card">
                  <div className="category-video-image">
                    <img
                      src={category.videoThumbnail}
                      alt="thumb"
                      className="img-responsive category-image"
                    />
                    <div className="category-name">
                      <h3>{category.categoryName}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            )
          );
        })}
      </div>
      <div className="home-category-heading">
        <h3>Trending courses</h3>
        <Link to="/explore" className="text-lg text-bold link-style-none ">
          See all <i className="fa-solid fa-angles-right"></i>
        </Link>
      </div>
      <div className="trending-courses margin-t margin-b">
        {data.videos.map((video) => {
          return (
            video.views > 600000 && (
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
                                        onClick={() =>
                                          addPlaylistVideos(video, playlist._id)
                                        }
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
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};
