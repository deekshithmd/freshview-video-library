import { useUserActions } from "../../hooks";
import { useData } from "../../contexts";

export const SaveWatchLater = ({video}) => {
  const { addWatchlater } = useUserActions();
  const { setId } = useData();
  return (
    <span
      className="option-item"
      onClick={() => {
        addWatchlater(video);
        setId(0);
      }}
    >
      Add Watch Later
    </span>
  );
};
