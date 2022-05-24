import "./profile.css";
import { SideBar } from "../SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../app/Slices/authSlice";

export const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successToast } = useToast();

  const logoutHandler = () => {
    dispatch(logoutUser());

    successToast("Succefully Logged Out...");
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
              : {`${user.firstName} ${user.lastName}`}
            </span>
          </div>
          <div className="profile-info">
            <span className="field-heading text-lg text-bold">Email </span>
            <span className="field-info text-md text-bold">: {user.email}</span>
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
