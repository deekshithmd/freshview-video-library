import { useData } from "../../contexts";
import { useUserActions } from "../../hooks";
export const Filter = () => {
  const { data } = useData();
  const { getFiltered } = useUserActions();
  return (
    <div className="filters">
      <p className="text-lg text-bold">Filters :</p>
      <span
        className="chip text-chip text-bold"
        onClick={() => getFiltered("All")}
      >
        All
      </span>
      {data.categories.map((category) => (
        <span
          className="chip text-chip text-bold"
          onClick={() => getFiltered(category.categoryName)}
          key={category._id}
        >
          {category.categoryName}
        </span>
      ))}
    </div>
  );
};
