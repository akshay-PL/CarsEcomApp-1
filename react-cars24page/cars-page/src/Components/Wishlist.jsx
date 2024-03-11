import React, { useState, useEffect } from "react";
import withAuth from "./PrivateRoute";
import { useNavigate } from "react-router-dom";
import "./wishlist.css";

const Wishlist = () => {
  // State variable to store wishlist items
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  // Function to fetch wishlist items from local storage
  useEffect(() => {
    // Retrieve wishlist items from local storage
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    // Decode base64 encoded image strings and format as data URL
    const decodedWishlist = storedWishlist.map((item) => ({
      ...item,
      productimage: getImageBase64(item.productimage),
    }));
    setWishlistItems(decodedWishlist);
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  // Function to convert base64 image data to blob URL
  const getImageBase64 = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  // Function to handle click event for viewing car details
  const handleSeeDetails = (car) => {
    navigate(`/main/details/${car.id}`, {
      state: { image: car.productimage },
    });
  };

  // Function to handle click event for buying a car
  const handleBuyClick = (car) => {
    navigate(`/buynowcheckout/${car.id}`, {
      state: { image: car.productimage },
    });
  };

  // Function to handle click event for removing an item from wishlist
  const handleRemoveFromWishlist = (index) => {
    const updatedWishlist = [...wishlistItems];
    updatedWishlist.splice(index, 1);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="wishlist-container">
      <h2>Wishlist</h2>
      <div className="wishlist-items">
        {/* Render wishlist items */}
        {wishlistItems.length > 0 ? (
          <ul>
            {wishlistItems.map((item, index) => (
              <li key={index} className="wishlist-item">
                {/* Render details of each wishlist item */}
                <strong>Brand:{item.brand}</strong> Model:{item.model}, Price:{" "}
                {item.price}
                <div className="wishlist-image-input">
                  <img
                    src={item.productimage} // Display image here
                    alt="Car"
                    className="wishlist-image" // Add class name here
                  />
                </div>
                <div className="wishlist-buttons">
                  <button
                    className="wishlist-view-details-button"
                    onClick={() => handleSeeDetails(item)}
                  >
                    View Details
                  </button>
                  <button
                    className="wishlist-buy-now-button"
                    onClick={() => handleBuyClick(item)}
                  >
                    Buy Now
                  </button>
                  <button
                    className="wishlist-remove-button"
                    onClick={() => handleRemoveFromWishlist(index)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in the wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default withAuth(Wishlist);
