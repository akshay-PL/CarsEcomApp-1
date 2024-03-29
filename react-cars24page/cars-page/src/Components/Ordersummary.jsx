import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import withAuth from "./PrivateRoute";
import axios from "axios";
import "./Ordersummary.css"; // Import CSS file

const Ordersummary = () => {
  const [orderData, setOrderData] = useState([]);
  const [showAllEntries, setShowAllEntries] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem("user"));
        if (!userData || !userData.email) {
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/ordersummary/${userData.email}` // Update URL to include user's email
        );

        const sortedOrders = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setOrderData(sortedOrders);
      } catch (error) {
        console.error("Error fetching order summary:", error);
      }
    };

    fetchOrderSummary();
  }, []);

  const handleToggleChange = () => {
    setShowAllEntries(!showAllEntries);
  };

  return (
    <div className="ordersummary-container">
      <button
        onClick={() => navigate("/main")}
        className="checkout-back-to-main-button"
      >
        <span>&#9664;</span>
      </button>

      <h1>Order Summary:</h1>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showAllEntries}
            onChange={handleToggleChange}
          />
          Show all entries
        </label>
      </div>
      {orderData.length === 0 ? (
        <p>CART IS EMPTY</p>
      ) : (
        <div>
          {orderData.map((order, index) => (
            <div className="order-box" key={index}>
              <div className="orderheading">
                <p>Order {index + 1}</p>
              </div>
              <div className="product">
                <div className="product-head">Product Information</div>
                <div className="product-info">
                  <p>Product Brand: {order.product_brand}</p>
                  <p>Product Type: {order.product_type}</p>
                  <p>Product Model: {order.product_model}</p>
                  <p>Product Price: {order.product_price}</p>
                </div>
              </div>
              <div className="Shipping">
                <div className="Shipping-head">Shipping Information</div>

                <div className="shipping-info">
                  <p>Shipping Full Name: {order.ship_fullName}</p>
                  <p>Shipping Email: {order.ship_email}</p>
                  <p>Shipping Address: {order.ship_address}</p>
                  <p>Shipping City: {order.ship_city}</p>
                  <p>Shipping Zip Code: {order.ship_zipCode}</p>
                </div>
              </div>
              <div className="Billing">
                <div className="Shipping-head">Billing Information</div>

                <div className="billing-info">
                  <p>Billing Full Name: {order.bill_fullName}</p>
                  <p>Billing Email: {order.bill_email}</p>
                  <p>Billing Address: {order.bill_address}</p>
                  <p>Billing City: {order.bill_city}</p>
                  <p>Billing Zip Code: {order.bill_zipCode}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default withAuth(Ordersummary);
