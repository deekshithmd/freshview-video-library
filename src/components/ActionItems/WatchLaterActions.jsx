import { useUserActions } from "../../hooks";
import { useData } from "../../contexts";

export const WatchLaterActions = ({ video }) => {
  const { addWatchlater, deleteWatchlater } = useUserActions();
  const { data, setId } = useData();
  const isInWatchlater = data.watchlater.some(
    (watchlatervideo) => watchlatervideo._id === video._id
  );

  return isInWatchlater ? (
    <span
      className="option-item"
      onClick={() => {
        deleteWatchlater(video);
        setId(0);
      }}
    >
      <i className="fa-solid fa-trash margin-r"></i>
      From Watch Later
    </span>
  ) : (
    <span
      className="option-item"
      onClick={() => {
        addWatchlater(video);
        setId(0);
      }}
    >
      <i className="fa-regular fa-clock margin-r"></i>
      Add Watch Later
    </span>
  );
};
