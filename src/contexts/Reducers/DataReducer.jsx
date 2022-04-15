export const DataReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_VIDEO":
      return { ...state, videos: action.payload };
    case "LOAD_CATEGORY":
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};
