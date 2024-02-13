// Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import carlogo from './Assets/carlogo.jpg';
import './Navbar.css';


const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
  
    // Optionally, you can redirect the user to the login page or any other page after logout
    navigate('/'); // Redirect to the login page
  };
  
  return (
    <div className="navbar">
      <div className="logo">
        <img src={carlogo} alt="" className="carlogoimage" />
      </div>
      <div className="heading">CarsEcom</div>
      <div className="nav-links">
        <div className="nav-link" onClick={() => handleNavigation('/about')}>
          About Us
        </div>
        <div className="nav-link" onClick={() => handleNavigation('/contact')}>
          Contact
        </div>
        <div className="nav-link logout-link" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Navbar;
