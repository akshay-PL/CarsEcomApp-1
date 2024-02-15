import React from "react";
import "./profile.css";

const ProfileModal = ({ open, handleClose }) => {
  return (
    <>
      {open && (
        <div className="modal-container" onClick={handleClose}>
          <div className="profile-modal-bg">this is profile</div>
          <div className="profile-modal">this is profile</div>
        </div>
      )}
    </>
  );
};

export default ProfileModal;
