import React, { useState, useEffect } from "react";
import withAuth from "./PrivateRoute";
import axios from "axios";
import "./Ordersummary.css"; // Import CSS file

const Ordersummary = () => {
  const [orderData, setOrderData] = useState(null);
  const [showAllEntries, setShowAllEntries] = useState(false);

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        // Retrieve user data from session storage
        const userData = JSON.parse(sessionStorage.getItem("user"));
        if (!userData || !userData.userName || !userData.email) {
          // If user data is not present, do nothing
          return;
        }

        // Filter orders based on username and email from session storage
        const response = await axios.get("http://localhost:3000/ordersummary", {
          params: {
            username: userData.userName,
            email: userData.email,
          },
        });

        // Sort orders by createdAt field in descending order
        const sortedOrders = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        // Set orderData based on showAllEntries checkbox
        if (showAllEntries) {
          setOrderData(sortedOrders);
        } else {
          setOrderData([sortedOrders[0]]);
        }
      } catch (error) {
        console.error("Error fetching order summary:", error);
      }
    };

    fetchOrderSummary();
  }, [showAllEntries]); // Fetch again when showAllEntries state changes

  const handleToggleChange = () => {
    setShowAllEntries(!showAllEntries);
  };

  return (
    <div>
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
      {orderData && (
        <div>
          {orderData.map((order, index) => (
            <div className="order-box" key={index}>
              <div className="orderheading">
                <p>Order {index + 1}</p>
              </div>
              <div className="user-info">
                <p>Username: {order.user_username}</p>
                <p>Email: {order.user_email}</p>
              </div>
              <div className="product-info">
                <p>Product Brand: {order.product_brand}</p>
                <p>Product Type: {order.product_type}</p>
                <p>Product Model: {order.product_model}</p>
                <p>Product Price: {order.product_price}</p>
              </div>

              <div className="shipping-info">
                <p>Shipping Full Name: {order.ship_fullName}</p>
                <p>Shipping Email: {order.ship_email}</p>
                <p>Shipping Address: {order.ship_address}</p>
                <p>Shipping City: {order.ship_city}</p>
                <p>Shipping Zip Code: {order.ship_zipCode}</p>
              </div>
              <div className="billing-info">
                <p>Billing Full Name: {order.bill_fullName}</p>
                <p>Billing Email: {order.bill_email}</p>
                <p>Billing Address: {order.bill_address}</p>
                <p>Billing City: {order.bill_city}</p>
                <p>Billing Zip Code: {order.bill_zipCode}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default withAuth(Ordersummary);
