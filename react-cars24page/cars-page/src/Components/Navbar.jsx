import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import carlogo from "./Assets/carlogo.jpg";
import "./Navbar.css";
import user from "./Assets/user.png";
import downarrow from "./Assets/down.png";
import logouticon from "./Assets/logouticon.png";
import Profileinfo from "./Profileinfo";
import ProfileModal from "./profileModal/profileModal";
import Editinformation from "./Editinformation";
import { Drawer } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const dropdownRef = useRef(null);
  const drawerRef = useRef(null);

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleClose = () => {
    setOpenProfile(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      drawerRef.current &&
      !drawerRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
      setOpenProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigateToProfile = () => {
    setShowDropdown(false);
    setOpenProfile(!openProfile);
  };

  const navigateToUpdateCredentials = () => {
    navigate("/update-credentials"); // Assuming this is your route for UpdateCredentials component
  };

  return (
    <div className="navbar">
      <div className="logo-container" onClick={() => navigate("/main")}>
        <div>
          <div className="loader" id="loader"></div>
          <img src={carlogo} id="logo" alt="" className="carlogoimage" />
        </div>

        <div className="heading">CarsEcom</div>
      </div>
      <div className="nav-links">
        <div
          className="nav-link"
          onClick={() => handleNavigation("/productstore")}
        >
          Add product
        </div>
        <div className="nav-link" onClick={() => handleNavigation("/about")}>
          About Us
        </div>
        <div className="nav-link" onClick={() => handleNavigation("/contact")}>
          Contact
        </div>
        <div
          className="nav-link"
          onClick={() => handleNavigation("/ordersummary")}
        >
          Orders
        </div>
        <div
          className="nav-link logout-link"
          ref={dropdownRef}
          onClick={handleDropdownToggle}
        >
          <img src={user} alt="User" className="user-icon" />
          {showDropdown && (
            <div className="dropdown-container">
              <div className="dropdown-option" onClick={handleLogout}>
                <img src={logouticon} alt="Logout" className="logout-icon" />
                Logout
              </div>
              <div className="dropdown-option" onClick={navigateToProfile}>
                Profile
              </div>
            </div>
          )}
        </div>
      </div>
      <ProfileModal open={false} handleClose={handleClose} />
      <Drawer
        ref={drawerRef}
        anchor="right"
        open={openProfile}
        onClose={() => setOpenProfile(false)} // Close the drawer on close event
        className="custom-drawer"
        PaperProps={{ style: { width: "50vw" } }} // Set the width of the Paper component inside Drawer
      >
        <div className="drawer-content">
          <Editinformation />
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
