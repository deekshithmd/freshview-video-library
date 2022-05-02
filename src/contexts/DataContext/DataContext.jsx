import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useUserActions } from "../../hooks";
import { getVideos, getCategories } from "../../services/services";
import { DataReducer } from "../Reducers/DataReducer";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  //const { addWatchlater } = useUserActions();
  const token = localStorage.getItem("login");
  const [id, setId] = useState(0);
  const [playlistModal, setPlaylistModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState();
  const [loading,setLoading]=useState(false)
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
      const vres = await getVideos();
      dispatch({ type: "LOAD_VIDEO", payload: vres.data.videos });
      dispatch({ type: "LOAD_FILTERED", payload: vres.data.videos });
      const cres = await getCategories();
      dispatch({ type: "LOAD_CATEGORY", payload: cres.data.categories });
      //persist data
      // const watch = JSON.parse(localStorage.getItem("watchlater"));
      // watch.length > 0 &&
      //   watch.map((video) => {
      //     addWatchlater(video)
      //   });
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
        setLoading
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { useData, DataProvider };
