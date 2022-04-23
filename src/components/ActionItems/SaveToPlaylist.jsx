import { useData } from "../../contexts";

export const SaveToPlaylist = () => {
  const { setPlaylistModal } = useData();
  return (
    <span
      className="option-item"
      onClick={() => setPlaylistModal((isShow) => (isShow ? false : true))}
    >
      Save to Playlist
    </span>
  );
};
