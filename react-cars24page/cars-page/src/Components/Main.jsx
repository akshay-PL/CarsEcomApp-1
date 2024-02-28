import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "./Axiosinterceptor.jsx"; // Import axiosInstance here
import { useNavigate } from "react-router-dom";
import "./Main.css";
import withAuth from "./PrivateRoute";

const Main = ({ test }) => {
  // State variables for managing data and navigation
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user")); // Get user from session storage

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
    if (user.role !== "admin") {
      navigate(`/main/details/${car.id}`, {
        state: { image: car.productimage },
      });
    }
  };

  // Function to handle click event for buying a car
  const handleBuyClick = (event, car) => {
    event.stopPropagation();
    navigate(`/buynowcheckout/${car.id}`, {
      state: { image: car.productimage },
    });
  };

  // Function to handle click event for editing a car (for admin)
  const handleEditClick = (event, car) => {
    event.stopPropagation();
    navigate(`/editproduct/${car.id}`); // Navigate to the editproduct page with car id
  };

  // Function to handle click event for deleting a car (for admin)
  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        const response = await axiosInstance.delete(
          `http://localhost:3000/cars/${id}`
        );
        if (response.status === 200) {
          alert("Item deleted successfully!");
          // Remove the deleted item from the list
          setCars(cars.filter((item) => item.id !== id));
        } else {
          alert("Failed to delete item.");
        }
      } catch (error) {
        console.error("Error during delete:", error);
        alert("An error occurred while deleting item.");
      }
    }
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
              {/* Conditional rendering for buttons based on role */}
              {user && user.role === "admin" ? (
                <div>
                  <button onClick={(event) => handleEditClick(event, car)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(car.id)}>
                    Delete
                  </button>
                </div>
              ) : (
                <button onClick={(event) => handleBuyClick(event, car)}>
                  Buy Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuth(Main);
