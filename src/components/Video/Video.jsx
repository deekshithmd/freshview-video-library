import ReactPlayer from "react-player";
export const Video = ({ id }) => {
  return (
    <>
      <ReactPlayer
        url={`http://www.youtube.com/embed/${id}`}
        controls
        width="100%"
        height="100%"
      />

      {/* <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
      ></iframe> */}
    </>
  );
};
