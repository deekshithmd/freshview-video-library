import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import {
  getVideos,
  getCategories,
  getWatchLater,
  addWatchLater,
  addLikedVideo,
  getLikedVideos,
  getHistory,
  addHistory,
  addPlaylist,
  getPlaylists,
  addPlaylistVideo,
} from "../../services/services";
import { DataReducer } from "../Reducers/DataReducer";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const token = localStorage.getItem("login");
  const [id, setId] = useState(0);
  const [playlistModal, setPlaylistModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState();
  const [loading, setLoading] = useState(false);
  const [loadtext, setLoadText] = useState("");
  const [showMini, setShowMini] = useState(false);
  const [data, dispatch] = useReducer(DataReducer, {
    videos: [],
    categories: [],
    liked: [],
    watchlater: [],
    history: [],
    playlist: [],
    filtered: [],
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      setLoadText("Loading...");
      const vres = await getVideos();
      dispatch({ type: "LOAD_VIDEO", payload: vres.data.videos });
      dispatch({ type: "LOAD_FILTERED", payload: vres.data.videos });
      const cres = await getCategories();
      dispatch({ type: "LOAD_CATEGORY", payload: cres.data.categories });

      if (token) {
        const watch = JSON.parse(localStorage.getItem("watchlater"));
        watch &&
          watch.map(async (item) => {
            await addWatchLater({ video: item, encodedToken: token });
          });

        const watchRes = await getWatchLater({ encodedToken: token });
        dispatch({
          type: "LOAD_WATCHLATER",
          payload: watchRes.data.watchlater,
        });

        const like = JSON.parse(localStorage.getItem("liked"));
        like &&
          like.map(async (item) => {
            await addLikedVideo({ video: item, encodedToken: token });
          });
        const likeRes = await getLikedVideos({ encodedToken: token });
        dispatch({
          type: "LOAD_LIKED",
          payload: likeRes.data.likes,
        });

        const history = JSON.parse(localStorage.getItem("history"));
        history &&
          history.map(async (item) => {
            await addHistory({ video: item, encodedToken: token });
          });
        const historyRes = await getHistory({ encodedToken: token });
        dispatch({
          type: "LOAD_HISTORY",
          payload: historyRes.data.history,
        });

        const playlist = JSON.parse(localStorage.getItem("playlist"));
        playlist &&
          playlist.map(async (item) => {
            await addPlaylist({ title: item.title, encodedToken: token });
            item?.videos?.map(async (video) => {
              await addPlaylistVideo({
                video: video,
                playlistId: item._id,
                encodedToken: token,
              });
            });
          });
        const playlistRes = await getPlaylists({ encodedToken: token });
        dispatch({
          type: "LOAD_PLAYLIST",
          payload: playlistRes.data.playlists,
        });
      }

      setCurrentVideo(JSON.parse(localStorage.getItem("singlevideo")));

      setLoadText("");
      setLoading(false);
    })();
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        dispatch,
        id,
        setId,
        playlistModal,
        setPlaylistModal,
        currentVideo,
        setCurrentVideo,
        loading,
        setLoading,
        loadtext,
        setLoadText,
        showMini,
        setShowMini,
        token,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { useData, DataProvider };
