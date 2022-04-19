import "./playlist.css";
import { SideBar } from "../SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts";
import { deletePlaylist } from "../../services/services";
export const PlayList = () => {
  const navigate = useNavigate();
  const { data, dispatch } = useData();
  const token = localStorage.getItem("login");

  const showPlaylistVideos = (playId) => {
    navigate(`/playlistvideos/${playId}`);
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
  };

  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content video-list">
        {data.playlist.map((playlist) => {
          return (
            <div className="video-card" key={playlist._id}>
              <div
                className="video-image"
                
              >
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
                      <span className="text-xl">{playlist.videos.length}</span>
                    </div>
                    <div className="delete">
                      <img
                        src="https://www.svgrepo.com/show/352601/trash.svg"
                        alt=""
                        onClick={()=>deletePlayList(playlist._id)}
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
                      <span className="text-xl">{playlist.videos.length}</span>
                    </div>
                    <div className="delete">
                      <img
                        src="https://www.svgrepo.com/show/352601/trash.svg"
                        alt=""
                        onClick={()=>deletePlayList(playlist._id)}
                      />
                    </div>
                  </>
                )}
              </div>
              <span className="text-2xl playlist-title">{playlist.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
