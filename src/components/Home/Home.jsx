import { Link } from "react-router-dom";
import { useData } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../hooks";
import { PlaylistModal } from "../PlaylistModal/PlaylistModal";
import { SaveToPlaylist } from "../ActionItems/SaveToPlaylist";
import { SaveWatchLater } from "../ActionItems/SaveWatchLater";
import "./home.css";

export const Home = () => {
  const navigate = useNavigate();
  const { data, id, setId } = useData();
  const { showSingleVideo, getFiltered } = useUserActions();
  let i = 0;

  return (
    <div className="home-container">
      <div className="banner-container margin-b">
        <div className="banner">
          <div className="banner-image">
            <img
              src="https://i.postimg.cc/V6b3XtCs/globalagriculture.jpg"
              alt="banner"
            />
          </div>
          <div className="banner-content-container">
            <div className="banner-content">
              <h1 className="banner-heading">
                Courses on Different Farming Practices...
              </h1>
              <h3 className="banner-sub-heading">
                Are you ready to explore...?
              </h3>

              <i className="fa-solid fa-angles-down arrow-down margin-b"></i>
              <button
                className="banner-btn"
                onClick={() => {
                  navigate("/explore");
                  getFiltered("All");
                }}
              >
                Explore Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="home-category-heading">
        <h3>Featured Categories</h3>
        <Link to="/explore" className="text-lg text-bold link-style-none ">
          See all <i className="fa-solid fa-angles-right"></i>
        </Link>
      </div>
      <div className="course-categories margin-t">
        {data.categories.map((category) => {
          i++;
          return (
            i < 6 && (
              <Link
                to="/explore"
                className="link-style-none"
                key={category._id}
              >
                <div
                  className="category-card"
                  onClick={() => getFiltered(category.categoryName)}
                >
                  <div className="category-video-image">
                    <img
                      src={category.videoThumbnail}
                      alt="thumb"
                      className="img-responsive category-image"
                    />
                    <div className="category-name">
                      <h3>{category.categoryName}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            )
          );
        })}
      </div>
      <div className="home-category-heading">
        <h3>Trending courses</h3>
        <Link to="/explore" className="text-lg text-bold link-style-none ">
          See all <i className="fa-solid fa-angles-right"></i>
        </Link>
      </div>
      <div className="trending-courses margin-t margin-b">
        {data.videos.map((video) => {
          return (
            video.views > 600000 && (
              <div className="video-card" key={video._id}>
                <div
                  className="video-image"
                  onClick={() => showSingleVideo(video)}
                >
                  <img
                    src={video.videoThumbnail}
                    alt="thumb"
                    className="img-responsive"
                  />
                </div>
                <div className="video-details text-md text-bold">
                  <div className="video-header">
                    <span className=" video-title text-justify">
                      {video.title}
                    </span>
                    <i
                      className="fa-solid fa-ellipsis-vertical options"
                      onClick={() => setId(id ? 0 : video._id)}
                    ></i>
                    {id === video._id && (
                      <span className="option-show">
                        <div className="video-options text-sm">
                          <PlaylistModal video={video} Id={id} />
                          <SaveToPlaylist />
                          <SaveWatchLater video={video} />
                        </div>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};
