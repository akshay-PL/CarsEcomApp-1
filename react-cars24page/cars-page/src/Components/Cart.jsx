import React, { useState, useEffect } from "react";
import withAuth from "./PrivateRoute";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const handleDeleteItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleBuyItem = (item) => {
    console.log("Buying item:", item);
  };

  const handleAddToWishlist = (item) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.find((wishlistItem) => wishlistItem.id === item.id)) {
      wishlist.push({ ...item, image: decodeBase64Image(item.productimage) });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Added to wishlist");
    } else {
      alert("Already in wishlist");
    }
  };

  const decodeBase64Image = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  const handleBuyNowClick = (itemId) => {
    navigate(`/buynowcheckout/${itemId}`);
  };

  const handleBuyAllItems = () => {
    navigate(`/buynowall`);
  };

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <div className="empty-cart-message">CART is EMPTY</div>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item-details">
                <strong>Brand:</strong> {item.brand}, <strong>Type:</strong>{" "}
                {item.type}, <strong>Model:</strong> {item.model},{" "}
                <strong>Price:</strong> {item.price}
              </div>
              <div className="cart-item-image">
                <img
                  src={decodeBase64Image(item.productimage)}
                  alt="Product"
                  className="cart-image"
                />
              </div>
              <div className="cart-buttons-container">
                <button
                  onClick={() => handleAddToWishlist(item)}
                  className="cart-wishlist-button"
                >
                  Wishlist
                </button>
                <button
                  onClick={() => handleBuyNowClick(item.id)}
                  className="cart-buy-now-button"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="cart-delete-button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-buy-all">
            <button onClick={handleBuyAllItems}>Buy All Items</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(Cart);
