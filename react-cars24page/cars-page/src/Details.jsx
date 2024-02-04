// Details.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './Details.css';

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const location = useLocation();

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

  return (
    <div className="details-container">
      <Link to="/main" className="back-to-main-button" style={{ position: 'absolute', top: '70px', left: '-5px', margin: '7px' }}>
        Back to Main
      </Link>
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
              
              <button className="buy-now-button">Buy Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
