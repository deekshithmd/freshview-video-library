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
import { useToast } from "./useToast";

export const useUserActions = () => {
  const { data, dispatch, setCurrentVideo, setLoading, setLoadText } =
    useData();
  const token = localStorage.getItem("login");
  const navigate = useNavigate();
  const { infoToast, warningToast } = useToast();

  const showSingleVideo = (video) => {
    setLoading(true);
    setLoadText("Loading...");
    localStorage.setItem("singlevideo", JSON.stringify(video));
    infoToast("Entering Single Video Page");
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
    infoToast("Added to Watchlater");
  };

  const addHistoryVideo = async (video) => {
    const historyResponse = await addHistory({
      video: video,
      encodedToken: token,
    });
    dispatch({ type: "LOAD_HISTORY", payload: historyResponse.data.history });
    infoToast("Added to History");
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
    infoToast("Added Video to Playlist");
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
    infoToast("Created New Playlist");
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
    warningToast("Deleted 1 video from History");
  };

  const clearHistoryVideos = async () => {
    setLoading(true);
    setLoadText("Clearing");
    const historyResponse = await clearHistory({ encodedToken: token });
    dispatch({ type: "LOAD_HISTORY", payload: historyResponse.data.history });
    setLoading(false);
    warningToast("Cleared History Videos");
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
    warningToast("Deleted 1 Video from Liked");
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
    warningToast("Playlist Deleted");
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
    warningToast("Deleted 1 Video from Watchlater");
  };

  const addLike = async (video) => {
    setLoading(true);
    setLoadText("Adding...");
    const likeRes = await addLikedVideo({ video: video, encodedToken: token });
    dispatch({ type: "LOAD_LIKED", payload: likeRes.data.likes });
    setLoading(false);
    infoToast("Added to Liked Videos");
  };

  const showPlaylistVideos = (playId) => {
    navigate(`/playlistvideos/${playId}`);
  };

  const getFiltered = (filters) => {
    setLoading(true);
    setLoadText("Filtering...");
    let { category, query } = filters;

    category = category ? category : "All";

    let filtered = data.videos;

    query
      ? (filtered = data.videos.filter((v) =>
          v.title.toLowerCase().match(query.toLowerCase())
        ))
      : (filtered = data.videos);

    filtered =
      category === "All"
        ? filtered
        : filtered.filter((video) => video.categoryName === category);

    dispatch({ type: "LOAD_FILTERED", payload: filtered });
    setLoading(false);
    infoToast(`Applied ${category} Filter`);
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
