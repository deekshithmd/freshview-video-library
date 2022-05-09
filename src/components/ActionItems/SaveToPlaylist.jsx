import { useData } from "../../contexts";

export const SaveToPlaylist = () => {
  const { setPlaylistModal } = useData();
  return (
    <span
      className="option-item"
      onClick={() => setPlaylistModal((isShow) => !isShow)}
    >
      <i className="fa-regular fa-circle-play margin-r"></i>
      Save to Playlist
    </span>
  );
};
