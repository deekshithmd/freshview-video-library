import {
  addWatchLater,
  addHistory,
  addPlaylistVideo,
  addPlaylist,
  deleteHistory,
  clearHistory,
  deleteLikedVideo,
  deletePlaylist,
  deleteWatchLater,
  getPlaylists,
  addLikedVideo,
} from "../services";
import { useData } from "../contexts";
import { useNavigate } from "react-router-dom";

export const useUserActions = () => {
  const { data, dispatch, setCurrentVideo, setLoading, setLoadText } =
    useData();
  const token = localStorage.getItem("login");
  const navigate = useNavigate();

  const showSingleVideo = (video) => {
    setLoading(true);
    setLoadText("Loading...");
    data.history.some((historyVideo) => historyVideo._id === video._id)
      ? null
      : addHistoryVideo(video);
    setCurrentVideo(video);
    navigate(`/singlevideo/${video._id}`);
    setLoading(false);
  };

  const addWatchlater = async (video) => {
    setLoading(true);
    setLoadText("Saving...");
    const watchlaterResponse = await addWatchLater({
      video: video,
      encodedToken: token,
    });
    dispatch({
      type: "LOAD_WATCHLATER",
      payload: watchlaterResponse.data.watchlater,
    });
    setLoading(false);
  };

  const addHistoryVideo = async (video) => {
    const historyResponse = await addHistory({
      video: video,
      encodedToken: token,
    });
    dispatch({ type: "LOAD_HISTORY", payload: historyResponse.data.history });
  };

  const addPlaylistVideos = async (video, playlistId) => {
    setLoading(true);
    setLoadText("Adding...");
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
    setLoading(false);
  };

  const addNewPlaylist = async (playlistName) => {
    setLoading(true);
    setLoadText("Creating...");
    const playlistResponse = await addPlaylist({
      title: playlistName,
      encodedToken: token,
    });
    dispatch({
      type: "LOAD_PLAYLIST",
      payload: playlistResponse.data.playlists,
    });
    setLoading(false);
  };

  const deleteHistoryVideo = async (video) => {
    setLoading(true);
    setLoadText("Removing...");
    const historyResponse = await deleteHistory({
      videoId: video._id,
      encodedToken: token,
    });
    dispatch({ type: "LOAD_HISTORY", payload: historyResponse.data.history });
    setLoading(false);
  };

  const clearHistoryVideos = async () => {
    setLoading(true);
    setLoadText("Clearing");
    const historyResponse = await clearHistory({ encodedToken: token });
    dispatch({ type: "LOAD_HISTORY", payload: historyResponse.data.history });
    setLoading(false);
  };

  const deleteLike = async (video) => {
    setLoading(true);
    setLoadText("Removing...");
    const likeResponse = await deleteLikedVideo({
      videoId: video._id,
      encodedToken: token,
    });
    dispatch({ type: "LOAD_LIKED", payload: likeResponse.data.likes });
    setLoading(false);
  };

  const deletePlayList = async (playlistId) => {
    setLoading(true);
    setLoadText("Deleting...");
    const playlistResponse = await deletePlaylist({
      playlistId: playlistId,
      encodedToken: token,
    });
    dispatch({
      type: "LOAD_PLAYLIST",
      payload: playlistResponse.data.playlists,
    });
    setLoading(false);
    navigate("/playlist");
  };

  const deleteWatchlater = async (video) => {
    setLoading(true);
    setLoadText("Removing...");
    const watchRes = await deleteWatchLater({
      videoId: video._id,
      encodedToken: token,
    });
    dispatch({ type: "LOAD_WATCHLATER", payload: watchRes.data.watchlater });
    setLoading(false);
  };

  const addLike = async (video) => {
    setLoading(true);
    setLoadText("Adding...");
    const likeRes = await addLikedVideo({ video: video, encodedToken: token });
    dispatch({ type: "LOAD_LIKED", payload: likeRes.data.likes });
    setLoading(false);
  };

  const showPlaylistVideos = (playId) => {
    navigate(`/playlistvideos/${playId}`);
  };

  const getFiltered = (category) => {
    setLoading(true);
    setLoadText("Filtering...");
    const filtered =
      category === "All"
        ? data.videos
        : data.videos.filter((video) => video.categoryName === category);
    dispatch({ type: "LOAD_FILTERED", payload: filtered });
    setLoading(false);
  };

  return {
    addWatchlater,
    addHistoryVideo,
    showSingleVideo,
    addPlaylistVideos,
    addNewPlaylist,
    deleteHistoryVideo,
    clearHistoryVideos,
    deleteLike,
    deletePlayList,
    deleteWatchlater,
    showPlaylistVideos,
    addLike,
    getFiltered,
  };
};
