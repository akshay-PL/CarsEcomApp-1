import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import withAuth from "./PrivateRoute";

const Main = ({ test }) => {
  // State variables for managing data and navigation
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const navigate = useNavigate();

  // Fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle click event for viewing car details
  const handleSeeDetails = (car) => {
    navigate(`/main/details/${car.id}`, { state: { image: car.productimage } });
  };

  // Function to handle click event for buying a car
  // Assuming you have a function for navigating to the Buynowcheckout page
  const handleBuyClick = (event, car) => {
    event.stopPropagation();
    navigate(`/buynowcheckout/${car.id}`, {
      state: { image: car.productimage },
    });
  };

  // Function to handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter cars based on search term
  const filteredCars = cars.filter((car) =>
    car.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-product-container">
      <div className="search">
        {/* Basic search bar input */}
        <input
          type="text"
          placeholder={"Seach here.."}
          value={searchTerm}
          onChange={handleSearchChange} // Add onChange event handler
        />
      </div>
      {/* Display cars in a grid layout */}
      <div className="grid-container">
        {/* Map through filtered cars and render each car */}
        {filteredCars.map((car) => (
          <div
            key={car.id}
            className={`grid-item carDetails car${car.id}`}
            onClick={() => handleSeeDetails(car)}
          >
            <div className="car-brand">
              <h3>{car.brand}</h3>
            </div>
            <img
              src={`data:image/jpeg;base64,${car.productimage}`}
              alt=""
              className={`car${car.id}-image`}
            />
            <div>
              <div>
                <p>
                  <span className="key">Brand :</span>{" "}
                  <span className="value">{car.brand}</span>
                </p>
                <p>
                  <span className="key">Type :</span>{" "}
                  <span className="value">{car.type}</span>
                </p>
                <p>
                  <span className="key">Model :</span>{" "}
                  <span className="value">{car.model}</span>
                </p>
                <p>
                  <span className="key">Price :</span>{" "}
                  <span className="value">{car.price}</span>
                </p>
              </div>
              <button onClick={(event) => handleBuyClick(event, car)}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuth(Main);
