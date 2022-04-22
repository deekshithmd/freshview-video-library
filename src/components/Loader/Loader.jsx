import "./loader.css";
export const Loader = ({ loadtext }) => {
  return (
    <div className="loader">
      <div className="center">
        <div className="ring"></div>
        <span className="text text-bold">{loadtext}...</span>
      </div>
    </div>
  );
};
