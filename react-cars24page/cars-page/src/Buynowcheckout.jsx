import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import "./Buynowcheckout.css";
import withAuth from "./Components/PrivateRoute";

function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [carImage, setCarImage] = useState(null); // State to store the decoded image
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
  const [hideBillingInfo, setHideBillingInfo] = useState(false);
  const [checkboxClicked, setCheckboxClicked] = useState(false);
  const [shippingAlertOpen, setShippingAlertOpen] = useState(false);
  const [billingAlertOpen, setBillingAlertOpen] = useState(false);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/cars/${id}`);
        setCarDetails(response.data);

        // Decode base64 image and set it to state
        const decodedImage = `data:image/jpeg;base64,${response.data.productimage}`;
        setCarImage(decodedImage);

        // Other existing logic...
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
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/shippingaddress",
        shippingFormData
      );
      setShippingAlertOpen(true); // Display Shipping Address received alert
      setTimeout(() => {
        setBillingAlertOpen(true); // Display Billing Address received alert after 1 second
      }, 1000);
    } catch (error) {
      console.error("Error adding shipping address:", error);
      alert("Failed to add shipping address. Please try again.");
    }
  };

  const handleBillingAddressSubmit = async (e) => {
    e.preventDefault();

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
      setTimeout(() => {
        setBillingAlertOpen(true); // Display Billing Address received alert after a delay
      }, 1000);
    } catch (error) {
      console.error("Error adding billing address:", error);
      alert("Failed to add billing address. Please try again.");
      return; // Exit early if there's an error
    }
  };

  const proceedToPayment = () => {
    navigate("/payment");
  };

  const handleSendDetails = async (e) => {
    e.preventDefault();

    const userData = JSON.parse(sessionStorage.getItem("user"));
    const { email } = userData;

    const orderData = {
      usermail: email,
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
      await axios.post("http://localhost:3000/ordersummary", orderData);
      setShippingAlertOpen(true);
      setTimeout(() => {
        setBillingAlertOpen(true);
        setTimeout(() => {
          proceedToPayment();
        }, 1000);
      }, 1000);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    const isShippingInfoEmpty = Object.values(shippingFormData).some(
      (val) => val === ""
    );

    if (isShippingInfoEmpty) {
      return;
    }

    setCheckboxClicked(true);

    setShippingFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));

    if (checked) {
      setHideBillingInfo(true);
      setBillingFormData((prevState) => ({
        ...prevState,
        fullName: shippingFormData.fullName,
        email: shippingFormData.email,
        address: shippingFormData.address,
        city: shippingFormData.city,
        zipCode: shippingFormData.zipCode,
      }));
    } else {
      setHideBillingInfo(false);
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
      <Typography variant="h5" className="checkout-heading" gutterBottom>
        Checkout
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {/* Displaying Product Details */}
          {carDetails && (
            <Card sx={{ display: "flex", marginBottom: "20px" }}>
              <CardMedia
                component="img"
                image={carImage}
                alt="Car Image"
                sx={{ width: 300, objectFit: "contain", marginRight: "20px" }}
              />
              <div
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "16px",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Product Details
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Brand: {carDetails.brand}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Model: {carDetails.model}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Year: {carDetails.year}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Price: {carDetails.price}
                </Typography>
              </div>
            </Card>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* Shipping and Billing Information */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <div className="shipping-info">
                <Typography variant="h6" gutterBottom>
                  Shipping Information
                </Typography>
                <TextField
                  type="text"
                  name="fullName"
                  value={shippingFormData.fullName}
                  onChange={handleShippingChange}
                  label="Full Name"
                  required
                  error={checkboxClicked && shippingFormData.fullName === ""}
                  fullWidth
                  margin="normal"
                  sx={{
                    width: shippingFormData.is_shipping_add_same ? 700 : "100%",
                    objectFit: "contain",
                    marginRight: "20px",
                  }}
                />

                <TextField
                  type="email"
                  name="email"
                  value={shippingFormData.email}
                  onChange={handleShippingChange}
                  label="Email"
                  required
                  error={checkboxClicked && shippingFormData.email === ""}
                  fullWidth
                  margin="normal"
                  sx={{
                    width: shippingFormData.is_shipping_add_same ? 700 : "100%",
                    objectFit: "contain",
                    marginRight: "20px",
                  }}
                />

                <TextField
                  type="text"
                  name="address"
                  value={shippingFormData.address}
                  onChange={handleShippingChange}
                  label="Address"
                  required
                  error={checkboxClicked && shippingFormData.address === ""}
                  fullWidth
                  margin="normal"
                  sx={{
                    width: shippingFormData.is_shipping_add_same ? 700 : "100%",
                    objectFit: "contain",
                    marginRight: "20px",
                  }}
                />

                <TextField
                  type="text"
                  name="city"
                  value={shippingFormData.city}
                  onChange={handleShippingChange}
                  label="City"
                  required
                  error={checkboxClicked && shippingFormData.city === ""}
                  fullWidth
                  margin="normal"
                  sx={{
                    width: shippingFormData.is_shipping_add_same ? 700 : "100%",
                    objectFit: "contain",
                    marginRight: "20px",
                  }}
                />

                <TextField
                  type="text"
                  name="zipCode"
                  value={shippingFormData.zipCode}
                  onChange={handleShippingChange}
                  label="Zip Code"
                  required
                  error={checkboxClicked && shippingFormData.zipCode === ""}
                  fullWidth
                  margin="normal"
                  sx={{
                    width: shippingFormData.is_shipping_add_same ? 700 : "100%",
                    objectFit: "contain",
                    marginRight: "20px",
                  }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={shippingFormData.is_shipping_add_same}
                      onChange={handleCheckboxChange}
                      name="is_shipping_add_same"
                    />
                  }
                  label="Same as billing address"
                />
              </div>
            </Grid>
            {!hideBillingInfo && (
              <Grid item xs={12} sm={6}>
                <div className="billing-info">
                  <Typography variant="h6" gutterBottom>
                    Billing Information
                  </Typography>
                  <TextField
                    type="text"
                    name="fullName"
                    value={billingFormData.fullName}
                    onChange={handleBillingChange}
                    label="Full Name"
                    required
                    error={checkboxClicked && billingFormData.fullName === ""}
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
                    error={checkboxClicked && billingFormData.email === ""}
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
                    error={checkboxClicked && billingFormData.address === ""}
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
                    error={checkboxClicked && billingFormData.city === ""}
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
                    error={checkboxClicked && billingFormData.zipCode === ""}
                    fullWidth
                    margin="normal"
                  />
                </div>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={shippingAlertOpen}
        autoHideDuration={6000}
        onClose={() => setShippingAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setShippingAlertOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Shipping Address received.
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={billingAlertOpen}
        autoHideDuration={6000}
        onClose={() => setBillingAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setBillingAlertOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Billing Address received.
        </MuiAlert>
      </Snackbar>
      <Button
        onClick={(e) => {
          handleShippingAddressSubmit(e);
          handleBillingAddressSubmit(e);
          handleSendDetails(e);
        }}
        variant="contained"
        color="primary"
        className="checkout-button"
        disabled={!allFieldsFilled}
        sx={{
          marginLeft: "744px", // Add marginLeft with desired value
          marginTop: "-5px",
        }}
      >
        Proceed to Payment
      </Button>
    </div>
  );
}

export default withAuth(CheckoutPage);
