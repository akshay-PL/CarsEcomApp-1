import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Editinformation from "./Editinformation"; // Import the Editinformation component
import "./Profileinfo.css";
import user_profile from "./Assets/user_profile_a.png";

const Profileinfo = () => {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control drawer open/close
  const navigate = useNavigate();

  const handleUpdate = () => {
    setIsDrawerOpen(true); // Open the drawer when Update button is clicked
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false); // Close the drawer
  };

  if (!userData || typeof userData !== "object") {
    return <div className="profile-container">No user profile found.</div>;
  }

  const { userName, email } = userData;

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="user_profile_img">
        <img src={user_profile} alt="User Profile Icon" />
      </div>
      <div className="profile-info">
        <p className="username">Username: {userName}</p>
        <p className="email">Email: {email}</p>
      </div>

      <div className="update">
        <button onClick={handleUpdate} className="update-button">
          Update user info
        </button>
      </div>

      {/* Drawer component to display Editinformation */}
      <div className="drawer-container">
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={closeDrawer}
          className="custom-drawer"
          PaperProps={{ style: { width: "50vw" } }} // Set the width of the Paper component inside Drawer
        >
          <div className="drawer-content">
            <Editinformation />
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Profileinfo;
