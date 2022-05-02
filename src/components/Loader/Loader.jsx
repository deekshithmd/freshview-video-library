import "./loader.css";
export const Loader = ({ text }) => {
  return (
    <div className="loader">
      <h1>{text}</h1>
      <div className="loading"></div>
    </div>
  );
};
