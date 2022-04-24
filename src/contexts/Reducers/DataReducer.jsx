export const DataReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_VIDEO":
      return { ...state, videos: action.payload };
    case "LOAD_CATEGORY":
      return { ...state, categories: action.payload };
    case "LOAD_LIKED":
      return { ...state, liked: action.payload };
    case "LOAD_WATCHLATER":
      return { ...state, watchlater: action.payload };
    case "LOAD_HISTORY":
      return { ...state, history: action.payload };
    case "LOAD_PLAYLIST":
      return { ...state, playlist: action.payload };
    case "LOAD_FILTERED":
      return { ...state, filtered: action.payload };
    default:
      return state;
  }
};
