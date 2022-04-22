import "./profile.css";
import { SideBar } from "../SideBar/SideBar";
import { useAuth } from "../../contexts";
import { useNavigate } from "react-router-dom";
//import { useEffect,useState } from "react";

export const Profile = () => {
  const { userData, setIsLoggedin, setUserData } = useAuth();
  const navigate = useNavigate();
  //const [user,setUser]=useState()

  const logoutHandler = () => {
    setIsLoggedin(false);
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    navigate("/");
  };

  // useEffect(() => {
  //   (() => {
  //     setUser(JSON.parse(localStorage.getItem("user")));
  //     console.log("useEffect",user)
  //   })();
  // },[]);

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
