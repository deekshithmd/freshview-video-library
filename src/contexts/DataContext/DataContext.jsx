import { createContext, useContext, useEffect, useReducer } from "react";
import { getVideos, getCategories } from "../../services/services";
import { DataReducer } from "../Reducers/DataReducer";

const DataContext = createContext();

const DataProvider = ({ children }) => {
 
  const [data, dispatch] = useReducer(DataReducer, {
    videos: [],
    categories: [],
  });

  useEffect(() => {
    (async () => {
      const vres = await getVideos();
      dispatch({ type: "LOAD_VIDEO", payload: vres.data.videos });
      const cres = await getCategories();
      dispatch({ type: "LOAD_CATEGORY", payload: cres.data.categories });
    })();
  }, []);

  return (
    <DataContext.Provider value={{ data, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { useData, DataProvider };
