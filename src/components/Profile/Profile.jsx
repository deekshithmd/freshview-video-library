import "./profile.css";
import { SideBar } from "../SideBar/SideBar";
import { useAuth } from "../../contexts";
import { useNavigate } from "react-router-dom";
export const Profile = () => {
  const { userData, setIsLoggedin } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    setIsLoggedin(false);
    localStorage.removeItem("login");
    navigate("/");
  };

  return (
    <div className="grid-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content">
        <div className="profile-card">
          <h2 className="text-center l-h-0">Profile Details</h2>
          <div className="profile-info">
            <span className="field-heading text-lg text-bold">Full Name </span>
            <span className="field-info text-md text-bold">
              : {`${userData.firstName} ${userData.lastName}`}
            </span>
          </div>
          <div className="profile-info">
            <span className="field-heading text-lg text-bold">Email </span>
            <span className="field-info text-md text-bold">
              : {userData.email}
            </span>
          </div>
          <button
            className="btn btn-solid-primary logout"
            onClick={logoutHandler}
          >
            Logout
            <i className="fa fa-sign-out margin-l"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
