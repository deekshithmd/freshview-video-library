import axios from "axios";

export const getVideos = async () => await axios.get("/api/videos");

export const getCategories = async () => await axios.get("/api/categories");

export const getLikedVideos = async ({ encodedToken }) =>
  await axios.get("/api/user/likes", {
    headers: {
      authorization: encodedToken,
    },
  });

export const addLikedVideos = async ({ video, encodedToken }) =>
  await axios.post(
    "/api/user/likes",
    { video },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

export const deleteLikedVideos = async ({ videoId, encodedToken }) =>
  await axios.delete(`/api/user/likes/${videoId}`, {
    headers: {
      authorization: encodedToken,
    },
  });

export const getWatchLater = async ({ encodedToken }) =>
  await axios.get("/api/user/watchlater", {
    headers: {
      authorization: encodedToken,
    },
  });

export const addWatchLater = async ({ video, encodedToken }) =>
  await axios.post(
    "/api/user/watchlater",
    { video },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

export const deleteWatchLater = async ({ videoId, encodedToken }) =>
  await axios.delete(
    `/api/user/watchlater/${videoId}`,

    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

export const getHistory = async ({ encodedToken }) =>
  await axios.get("/api/user/history", {
    headers: {
      authorization: encodedToken,
    },
  });

export const addHistory = async ({ video, encodedToken }) =>
  await axios.post(
    "/api/user/history",
    { video },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

export const deleteHistory = async ({ videoId, encodedToken }) =>
  await axios.delete(`/api/user/history/${videoId}`, {
    headers: {
      authorization: encodedToken,
    },
  });

export const clearHistory = async ({ encodedToken }) =>
  await axios.delete("/api/user/history/all", {
    headers: {
      authorization: encodedToken,
    },
  });

export const getPlaylists = async ({ encodedToken }) =>
  await axios.get("/api/user/playlists", {
    headers: {
      authorization: encodedToken,
    },
  });

export const addPlaylist = async ({ title, encodedToken }) =>
  await axios.post(
    "/api/user/playlists",
    {
      playlist: { title: title, description: "sample list" },
    },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

export const deletePlaylist = async ({ playlistId, encodedToken }) =>
  await axios.delete(`/api/user/playlists/${playlistId}`, {
    headers: {
      authorization: encodedToken,
    },
  });

export const getPlaylistVideo = async ({ playlistId, encodedToken }) =>
  await axios.get(`/api/user/playlists/${playlistId}`, {
    headers: {
      authorization: encodedToken,
    },
  });

export const addPlaylistVideo = async ({ video, playlistId, encodedToken }) =>
  await axios.post(
    `/api/user/playlists/${playlistId}`,
    {
      video,
    },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

export const deletePlaylistVideo = async ({
  videoId,
  playlistId,
  encodedToken,
}) =>
  await axios.delete(`/api/user/playlists/${playlistId}/${videoId}`, {
    headers: {
      authorization: encodedToken,
    },
  });

  