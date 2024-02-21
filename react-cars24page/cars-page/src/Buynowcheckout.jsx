import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Buynowcheckout.css";
import withAuth from "./Components/PrivateRoute";

function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [carImage, setCarImage] = useState(null);
  const [carDetails, setCarDetails] = useState(null);
  const [shippingFormData, setShippingFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    is_shipping_add_same: false,
  });
  const [billingFormData, setBillingFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/cars/${id}`);
        setCarDetails(response.data);
        if (location && location.state && location.state.image) {
          setCarImage(location.state.image);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [id, location]);

  useEffect(() => {
    const isShippingFormFilled =
      Object.values(shippingFormData).every((val) => val !== "") &&
      (shippingFormData.is_shipping_add_same ||
        Object.values(billingFormData).every((val) => val !== ""));
    const isBillingFormFilled =
      Object.values(billingFormData).every((val) => val !== "") &&
      (!shippingFormData.is_shipping_add_same ||
        Object.values(shippingFormData).every((val) => val !== ""));

    setAllFieldsFilled(isShippingFormFilled && isBillingFormFilled);
  }, [shippingFormData, billingFormData]);

  const handleShippingAddressSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      await axios.post(
        "http://localhost:3000/shippingaddress",
        shippingFormData
      );
      alert("Shipping address received successfully");
    } catch (error) {
      console.error("Error adding shipping address:", error);
      alert("Failed to add shipping address. Please try again.");
    }
  };

  const handleBillingAddressSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    const isBillingFormFilled = Object.values(billingFormData).every(
      (val) => val !== ""
    );
    if (!isBillingFormFilled) {
      alert("Please fill in all fields for billing address");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/billing-address",
        billingFormData
      );
      alert("Billing address received successfully");
    } catch (error) {
      console.error("Error adding billing address:", error);
      alert("Failed to add billing address. Please try again.");
    }
  };
  const proceedtopayment = async () => {
    navigate("/payment");
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSendDetails = async (e) => {
    e.preventDefault();

    // Retrieve user data from session storage
    const userData = JSON.parse(sessionStorage.getItem("user"));
    const { userName, email } = userData;

    // Gather all the necessary information
    const orderData = {
      user_username: userName,
      user_email: email,
      product_brand: carDetails.brand,
      product_type: carDetails.type,
      product_model: carDetails.model,
      product_price: carDetails.price,
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

    try {
      // Make a POST request to the /ordersummary endpoint
      await axios.post("http://localhost:3000/ordersummary", orderData);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setShippingFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    if (checked) {
      setBillingFormData({
        ...shippingFormData,
      });
    } else {
      setBillingFormData({
        fullName: "",
        email: "",
        address: "",
        city: "",
        zipCode: "",
      });
    }
  };

  return (
    <div className="checkout-container">
      <button
        onClick={() => navigate("/main")}
        className="checkout-back-to-main-button"
      >
        <span>&#9664;</span>
      </button>
      <h1 className="checkout-heading">Checkout</h1>

      <div className="product-information-container">
        {carDetails && (
          <div className="product-info">
            <h2>Product Information</h2>
            <p>
              <strong>Brand:</strong> {carDetails.brand}
            </p>
            <p>
              <strong>Type:</strong> {carDetails.type}
            </p>
            <p>
              <strong>Model:</strong> {carDetails.model}
            </p>
            <p>
              <strong>Price:</strong> {carDetails.price}
            </p>
          </div>
        )}
        {carDetails && (
          <div className="product-image">
            <p>Image URL: {carDetails.image}</p>
            <img src={carDetails.image} alt="Car" />
          </div>
        )}
      </div>
      <form onSubmit={handleSendDetails} className="checkout-form">
        <div className="shipping-info">
          <h2>Shipping Information</h2>
          <input
            type="text"
            name="fullName"
            value={shippingFormData.fullName}
            onChange={handleShippingChange}
            placeholder="Full Name"
            required
            className="input-field"
          />
          <br />
          <input
            type="email"
            name="email"
            value={shippingFormData.email}
            onChange={handleShippingChange}
            placeholder="Email"
            required
            className="input-field"
          />
          <br />
          <input
            type="text"
            name="address"
            value={shippingFormData.address}
            onChange={handleShippingChange}
            placeholder="Address"
            required
            className="input-field"
          />
          <br />
          <input
            type="text"
            name="city"
            value={shippingFormData.city}
            onChange={handleShippingChange}
            placeholder="City"
            required
            className="input-field"
          />
          <br />
          <input
            type="text"
            name="zipCode"
            value={shippingFormData.zipCode}
            onChange={handleShippingChange}
            placeholder="Zip Code"
            required
            className="input-field"
          />
          <br />
          <label>
            <input
              type="checkbox"
              name="is_shipping_add_same"
              onChange={handleCheckboxChange}
              className="checkbox"
            />
            Same as billing address
          </label>
          <br />
        </div>

        <div
          className="billing-info"
          style={{
            display: shippingFormData.is_shipping_add_same ? "none" : "block",
          }}
        >
          <h2>Billing Information</h2>
          <input
            type="text"
            name="fullName"
            value={billingFormData.fullName}
            onChange={handleBillingChange}
            placeholder="Full Name"
            required
            className="input-field"
          />
          <br />
          <input
            type="email"
            name="email"
            value={billingFormData.email}
            onChange={handleBillingChange}
            placeholder="Email"
            required
            className="input-field"
          />
          <br />
          <input
            type="text"
            name="address"
            value={billingFormData.address}
            onChange={handleBillingChange}
            placeholder="Address"
            required
            className="input-field"
          />
          <br />
          <input
            type="text"
            name="city"
            value={billingFormData.city}
            onChange={handleBillingChange}
            placeholder="City"
            required
            className="input-field"
          />
          <br />
          <input
            type="text"
            name="zipCode"
            value={billingFormData.zipCode}
            onChange={handleBillingChange}
            placeholder="Zip Code"
            required
            className="input-field"
          />
          <br />
        </div>
        <button
          onClick={(e) => {
            handleShippingAddressSubmit(e);
            handleBillingAddressSubmit(e);
            handleSendDetails(e);
            proceedtopayment(e);
          }}
          className="checkout-button"
          disabled={!allFieldsFilled}
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}

export default withAuth(CheckoutPage);
