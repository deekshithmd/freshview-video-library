export const DataReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_VIDEO":
      return { ...state, videos: action.payload };
    case "LOAD_CATEGORY":
      return { ...state, categories: action.payload };
    case "LOAD_LIKED":
      localStorage.setItem("liked", JSON.stringify(action.payload));
      return { ...state, liked: action.payload };
    case "LOAD_WATCHLATER":
      localStorage.setItem("watchlater", JSON.stringify(action.payload));
      return { ...state, watchlater: action.payload };
    case "LOAD_HISTORY":
      localStorage.setItem("history", JSON.stringify(action.payload));
      return { ...state, history: action.payload };
    case "LOAD_PLAYLIST":
      localStorage.setItem("playlist", JSON.stringify(action.payload));
      return { ...state, playlist: action.payload };
    case "LOAD_FILTERED":
      return { ...state, filtered: action.payload };
    default:
      return state;
  }
};
