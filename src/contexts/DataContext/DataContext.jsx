import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getVideos, getCategories } from "../../services/services";
import { DataReducer } from "../Reducers/DataReducer";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [id, setId] = useState(0);
  const [playlistModal, setPlaylistModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState();
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { useData, DataProvider };
