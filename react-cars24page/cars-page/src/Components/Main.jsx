import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "./Axiosinterceptor.jsx"; // Import axiosInstance here
import { useNavigate } from "react-router-dom";
import "./Main.css";
import wishlist_icon from "./Assets/wishlist_icon.png";
import cart_icon from "./Assets/cart_icon.png";
import mic_icon from "./Assets/mic_icon.png";

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

  const handleMicClick = () => {
    alert("Currently not functional. Update coming soon!");
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

  // Function to handle adding item to cart
  const handleAddToCart = (car) => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Check if the car is already in the cart
    const isAlreadyInCart = cart.some((item) => item.id === car.id);

    if (isAlreadyInCart) {
      alert("This item is already in the cart.");
    } else {
      cart.push(car);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to Cart");
    }
  };

  // Function to handle wishlist button click
  const handleWishlistClick = (car) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    // Check if the car is already in the wishlist
    if (!wishlist.find((item) => item.id === car.id)) {
      wishlist.push({ ...car, image: getImageBase64(car.productimage) });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Added to wishlist");
    } else {
      alert("Already in wishlist");
    }
  };

  // Function to convert base64 image data to blob URL
  const getImageBase64 = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
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
        <img
          src={mic_icon}
          alt="Mic"
          className="mic-icon"
          onClick={handleMicClick} // Add onClick event handler
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
                <div className="main-buttons-row">
                  <div className="main-wishlist-button">
                    <img
                      src={wishlist_icon}
                      alt="Wishlist"
                      onClick={() => handleWishlistClick(car)}
                    />
                  </div>
                  <div className="main-buy-now-button">
                    {/* Add class to the div */}
                    <button onClick={(event) => handleBuyClick(event, car)}>
                      Buy Now
                    </button>
                  </div>
                  <div className="main-cart-button">
                    {/* Add class to the div */}
                    <img
                      src={cart_icon}
                      alt="Add to Cart"
                      onClick={() => handleAddToCart(car)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuth(Main);
