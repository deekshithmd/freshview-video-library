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
  const { data, dispatch, setCurrentVideo, setLoading } = useData();
  const token = localStorage.getItem("login");
  const navigate = useNavigate();

  const showSingleVideo = (video) => {
    data.history.some((historyVideo) => historyVideo._id === video._id)
      ? null
      : addHistoryVideo(video);
    setCurrentVideo(video);
    navigate(`/singlevideo/${video._id}`);
  };

  const addWatchlater = async (video) => {
    setLoading(true);
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

  const addNewPlaylist = async (playlistName) => {
    const playlistResponse = await addPlaylist({
      title: playlistName,
      encodedToken: token,
    });
    dispatch({
      type: "LOAD_PLAYLIST",
      payload: playlistResponse.data.playlists,
    });
  };

  const deleteHistoryVideo = async (video) => {
    const historyResponse = await deleteHistory({
      videoId: video._id,
      encodedToken: token,
    });
    dispatch({ type: "LOAD_HISTORY", payload: historyResponse.data.history });
  };

  const clearHistoryVideos = async () => {
    const historyResponse = await clearHistory({ encodedToken: token });
    dispatch({ type: "LOAD_HISTORY", payload: historyResponse.data.history });
  };

  const deleteLike = async (video) => {
    const likeResponse = await deleteLikedVideo({
      videoId: video._id,
      encodedToken: token,
    });
    dispatch({ type: "LOAD_LIKED", payload: likeResponse.data.likes });
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
    navigate("/playlist");
  };

  const deleteWatchlater = async (video) => {
    const watchRes = await deleteWatchLater({
      videoId: video._id,
      encodedToken: token,
    });
    dispatch({ type: "LOAD_WATCHLATER", payload: watchRes.data.watchlater });
  };

  const addLike = async (video) => {
    const likeRes = await addLikedVideo({ video: video, encodedToken: token });
    dispatch({ type: "LOAD_LIKED", payload: likeRes.data.likes });
  };

  const showPlaylistVideos = (playId) => {
    navigate(`/playlistvideos/${playId}`);
  };

  const getFiltered = (category) => {
    const filtered =
      category === "All"
        ? data.videos
        : data.videos.filter((video) => video.categoryName === category);
    dispatch({ type: "LOAD_FILTERED", payload: filtered });
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
