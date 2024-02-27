import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Details.css";
import withAuth from "./Components/PrivateRoute";

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/cars/${id}`);
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchDetails();
  }, [id]);

  // Function to handle click event for buying a car
  const handleBuyClick = () => {
    navigate(`/buynowcheckout/${id}`);
  };

  return (
    <div className="details-container">
      <button
        onClick={() => navigate("/main")}
        className="back-to-main-button"
        style={{
          position: "absolute",
          top: "70px",
          left: "-5px",
          margin: "7px",
        }}
      >
        <span>&#9664;</span>
      </button>
      {details && (
        <div className="car-details">
          <div className="image-box">
            {/* Use details.productimage directly */}
            <img
              src={`data:image/jpeg;base64,${details.productimage}`}
              alt=""
              className="car-image"
            />
          </div>
          <div className="details-info-box">
            <div className="details-info">
              <h3>
                {details.brand} {details.model}
              </h3>
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
              <button className="buy-now-button" onClick={handleBuyClick}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(Details);
