import React from "react";
import "./profile.css";
import Profileinfo from "../Profileinfo.jsx";

const ProfileModal = ({ open, handleClose }) => {
  return (
    <>
      {open && (
        <div className="modal-container">
          <div className="profile-modal-bg" onClick={handleClose}></div>
          <div className="profile-modal">
            <Profileinfo />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileModal;
