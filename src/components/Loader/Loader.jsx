import "./loader.css";
export const Loader = ({ loadtext }) => {
  return (
    <div className="loader">
      <div className="loading">{loadtext}</div>
    </div>
  );
};
