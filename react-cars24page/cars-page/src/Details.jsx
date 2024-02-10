// Details.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './Details.css';

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const location = useLocation();
  const navigate = useNavigate(); // Get the navigation function

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/cars/${id}`);
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchDetails();
  }, [id]);

  const carImage = location.state ? location.state.image : '';

  // Function to handle click event for buying a car
  const handleBuyClick = () => {
    navigate(`/buynowcheckout/${id}`); // Navigate to BuyNowCheckout.jsx
  };

  return (
    <div className="details-container">
      {/* Use a button for navigation */}
      <button
        onClick={() => navigate('/main')} // Use navigate function to navigate
        className="back-to-main-button"
        style={{ position: 'absolute', top: '70px', left: '-5px', margin: '7px' }}
      >
        <span>&#9664;</span>
      </button>
      {details && (
        <div className="car-details">
          <div className="image-box">
            <img src={carImage} alt="" className="car-image" />
          </div>
          <div className="details-info-box">
            <div className="details-info">
              <h3>{details.brand} {details.model}</h3>
              <div className="car-info">
                <p>Brand: {details.brand}</p>
                <p>Type: {details.type}</p>
                <p>Model: {details.model}</p>
                <p>Price ₹: {details.price}</p>
              </div>
              <div className="details-description">
                <p>Description: {details.description}</p>
              </div>
            </div>
            <div className="details-actions">
              <button className="buy-now-button" onClick={handleBuyClick}>Buy Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
