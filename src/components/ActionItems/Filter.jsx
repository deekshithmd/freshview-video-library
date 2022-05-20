import { useData } from "../../contexts";
import { useUserActions } from "../../hooks";
export const Filter = () => {
  const { data } = useData();
  const { getFiltered } = useUserActions();
  return (
    <div className="filters margin-t">
      <span
        className="chip text-chip text-bold"
        onClick={() => getFiltered({ category: "All" })}
      >
        All
      </span>
      {data.categories.map((category) => (
        <span
          className="chip text-chip text-bold"
          onClick={() => getFiltered({ category: category.categoryName })}
          key={category._id}
        >
          {category.categoryName}
        </span>
      ))}
    </div>
  );
};
