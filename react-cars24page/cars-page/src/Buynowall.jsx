import React, { useState, useEffect } from "react";
import withAuth from "./Components/PrivateRoute";
import "./Buynowall.css"; // Import CSS file for styling
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const Buynowall = () => {
  // Define state to store cart items
  const [cartItems, setCartItems] = useState([]);
  const [shippingFormData, setShippingFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [billingFormData, setBillingFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [checkboxClicked, setCheckboxClicked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Retrieve data from session storage and update state on component mount
  useEffect(() => {
    const items = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCartItems(items);

    // Calculate total price
    const total = items.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  }, []);

  // Function to handle shipping form changes
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle billing form changes
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    setCheckboxClicked(!checkboxClicked);
    if (!checkboxClicked) {
      setBillingFormData({ ...shippingFormData });
    }
  };

  // Function to make POST request for shipping address
  const submitShipping = async () => {
    try {
      const { fullName, email, address, city, zipCode } = shippingFormData;
      const requestData = {
        fullName,
        email,
        address,
        city,
        zipCode,
        is_shipping_add_same: checkboxClicked,
      };

      await axios.post("http://localhost:3000/shippingaddress", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Shipping Address received.");
    } catch (error) {
      console.error("Error submitting shipping information:", error);
    }
  };

  // Function to make POST request for billing address
  const submitBilling = async () => {
    try {
      await axios.post(
        "http://localhost:3000/billing-address",
        billingFormData
      );
      alert("Billing Address received.");
    } catch (error) {
      console.error("Error submitting billing information:", error);
    }
  };

  // Function to handle order summary
  const proceed = () => {
    alert("payment clicked");
  };

  const handleOrderSummary = async () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem("user"));
      const { email } = userData;

      for (let i = 0; i < cartItems.length; i++) {
        const currentProduct = cartItems[i];
        console.log(currentProduct);
        console.log(currentProduct.brand);
        console.log(currentProduct.type);
        console.log(currentProduct.model);
        console.log(currentProduct.price);

        // Prepare order data for the current product
        const orderData = {
          usermail: email,
          product_brand: currentProduct.brand,
          product_type: currentProduct.type,
          product_model: currentProduct.model,
          product_price: currentProduct.price,
          ship_fullName: shippingFormData.fullName,
          ship_email: shippingFormData.email,
          ship_address: shippingFormData.address,
          ship_city: shippingFormData.city,
          ship_zipCode: shippingFormData.zipCode,
          bill_fullName: billingFormData.fullName,
          bill_email: billingFormData.email,
          bill_address: billingFormData.address,
          bill_city: billingFormData.city,
          bill_zipCode: billingFormData.zipCode,
        };

        // Send order data to the backend
        await axios.post("http://localhost:3000/ordersummary", orderData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (i < cartItems.length - 1) {
          // If there are more products, ask the user to confirm before proceeding to the next one
          if (!confirm("Do you want to proceed to the next product?")) {
            break; // If the user cancels, exit the loop
          }
        }
      }

      alert("Order summary sent successfully.");
    } catch (error) {
      console.error("Error handling order summary:", error);
      alert("Failed to send order summary. Please try again.");
    }
  };

  // Check if cartItems is empty
  if (cartItems.length === 0) {
    return <div>No data available</div>;
  }

  // Render product details
  return (
    <div className="buyallcontainer">
      {/* Product Details Section */}
      <div className="buyall-product-container">
        <h1>Product Details</h1>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <div className="buyall-product-item">
                {/* Add serial number */}
                <div className="buyall-serial-number">{index + 1}</div>
                <div className="buyall-product-image">
                  <img
                    src={`data:image/jpeg;base64,${item.productimage}`}
                    alt={`Image of ${item.brand}`}
                  />
                </div>
                <div className="buyall-product-info">
                  <h2>{item.brand}</h2>
                  <p>Model: {item.model}</p>
                  <p>Type: {item.type}</p>
                  <p>Price: {item.price}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Shipping and Billing Information */}
      <div className="buyall-info-container">
        <div className="buyall-shipping-billing-container">
          <div className="buyall-shipping-info">
            <h2>Shipping Information</h2>
            <TextField
              type="text"
              name="fullName"
              value={shippingFormData.fullName}
              onChange={handleShippingChange}
              label="Full Name"
              required
              fullWidth
              margin="normal"
            />
            <TextField
              type="email"
              name="email"
              value={shippingFormData.email}
              onChange={handleShippingChange}
              label="Email"
              required
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="address"
              value={shippingFormData.address}
              onChange={handleShippingChange}
              label="Address"
              required
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="city"
              value={shippingFormData.city}
              onChange={handleShippingChange}
              label="City"
              required
              fullWidth
              margin="normal"
            />
            <TextField
              type="text"
              name="zipCode"
              value={shippingFormData.zipCode}
              onChange={handleShippingChange}
              label="Zip Code"
              required
              fullWidth
              margin="normal"
            />
            <Button onClick={submitShipping}>Submit Shipping</Button>
          </div>

          <div className="buyall-billing-info">
            <h2>Billing Information</h2>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkboxClicked}
                  onChange={handleCheckboxChange}
                  name="is_shipping_add_same"
                />
              }
              label="Same as shipping address"
            />
            {!checkboxClicked && (
              <>
                <TextField
                  type="text"
                  name="fullName"
                  value={billingFormData.fullName}
                  onChange={handleBillingChange}
                  label="Full Name"
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  type="email"
                  name="email"
                  value={billingFormData.email}
                  onChange={handleBillingChange}
                  label="Email"
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  type="text"
                  name="address"
                  value={billingFormData.address}
                  onChange={handleBillingChange}
                  label="Address"
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  type="text"
                  name="city"
                  value={billingFormData.city}
                  onChange={handleBillingChange}
                  label="City"
                  required
                  fullWidth
                  margin="normal"
                />
                <TextField
                  type="text"
                  name="zipCode"
                  value={billingFormData.zipCode}
                  onChange={handleBillingChange}
                  label="Zip Code"
                  required
                  fullWidth
                  margin="normal"
                />
                <Button onClick={submitBilling}>Submit Billing</Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Total price and Proceed to payment */}
      <div className="buyall-total-price">
        <TextField
          type="text"
          label="Total Price"
          value={totalPrice}
          disabled
          fullWidth
          margin="normal"
        />
      </div>
      <div className="buyall-payment">
        <button onClick={proceed}>Proceed to payment</button>
      </div>
      <div className="buyall-ordersummary">
        <button onClick={handleOrderSummary}>submitorder</button>
      </div>
    </div>
  );
};

export default withAuth(Buynowall);
