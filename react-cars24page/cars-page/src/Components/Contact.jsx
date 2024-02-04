// CSS for your Contact component
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css'; // Import the CSS file

const Contact = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/main');
  };

  return (
    <div className="container-contact">
      <button className="go-back-button" onClick={handleGoBack}>
        Go back to Main
      </button>
      <div className="contact-info-box">
        <h1>Contact information</h1>
        <h2>Company : CarsEcom</h2>
        <p>Email: info@carsrcom.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 456 Auto Lane, Citytown, State, 56789</p>
      </div>
      <footer className="page-footer"></footer>
    </div>
  );
};

export default Contact;
