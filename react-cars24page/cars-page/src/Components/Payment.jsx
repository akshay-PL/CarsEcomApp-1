import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Box,
  Grid,
  CircularProgress, // Import CircularProgress component
} from "@mui/material";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentFormData, setPaymentFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate(); // Initialize navigate hook

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    // Start loading
    setLoading(true);

    // Simulate payment submission delay
    setTimeout(() => {
      // Stop loading
      setLoading(false);

      // Validate form fields
      const validationErrors = {};
      if (paymentMethod === "creditCard") {
        if (!paymentFormData.nameOnCard.trim()) {
          validationErrors.nameOnCard = "Name on card is required";
        }
        if (!paymentFormData.cardNumber.trim()) {
          validationErrors.cardNumber = "Card number is required";
        }
        if (!paymentFormData.expiryMonth.trim()) {
          validationErrors.expiryMonth = "Expiry month is required";
        }
        if (!paymentFormData.expiryYear.trim()) {
          validationErrors.expiryYear = "Expiry year is required";
        }
        if (!paymentFormData.cvv.trim()) {
          validationErrors.cvv = "CVV is required";
        }
      }

      // Set errors if any
      setErrors(validationErrors);

      // If no validation errors, proceed with payment submission
      if (Object.keys(validationErrors).length === 0) {
        try {
          navigate("/ordersummary"); // Navigate to ordersummary after successful payment
        } catch (error) {
          console.error("Error submitting payment:", error);
          alert("Failed to submit payment. Please try again.");
        }
      }
    }, 3000); // Simulate 3000 milliseconds delay
  };

  return (
    <div className="payment-outer">
      <h1>Select Payment Method</h1>
      <form onSubmit={handlePaymentSubmit}>
        <FormControl component="fieldset" error={errors.paymentMethod}>
          <RadioGroup
            aria-label="paymentMethod"
            name="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <FormControlLabel
              value="creditCard"
              control={<Radio />}
              label="Credit Card"
            />
            <FormControlLabel
              value="paypal"
              control={<Radio />}
              label="Paypal"
            />
            <FormControlLabel
              value="bankTransfer"
              control={<Radio />}
              label="Bank Transfer"
            />
          </RadioGroup>
          {errors.paymentMethod && <span>{errors.paymentMethod}</span>}
        </FormControl>
        {paymentMethod === "creditCard" && (
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="nameOnCard"
                  value={paymentFormData.nameOnCard}
                  onChange={handlePaymentChange}
                  label="Name on Card"
                  required
                  sx={{ width: "400px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="cardNumber"
                  value={paymentFormData.cardNumber}
                  onChange={handlePaymentChange}
                  label="Card Number"
                  required
                  sx={{ width: "400px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="expiryMonth"
                  value={paymentFormData.expiryMonth}
                  onChange={handlePaymentChange}
                  label="Expiry Month"
                  required
                  sx={{ width: "400px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="expiryYear"
                  value={paymentFormData.expiryYear}
                  onChange={handlePaymentChange}
                  label="Expiry Year"
                  required
                  sx={{ width: "400px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="cvv"
                  value={paymentFormData.cvv}
                  onChange={handlePaymentChange}
                  label="CVV"
                  required
                  sx={{ width: "400px" }}
                />
              </Grid>
            </Grid>
          </Box>
        )}
        {paymentMethod !== "creditCard" && (
          <Box mt={2}>
            <p>Update soon</p>
            {/* Empty Box to reserve space */}
            <Box height="295px" />
          </Box>
        )}
        {/* Conditional rendering of CircularProgress */}
        {loading && (
          <Box
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
            <Box mt={2}>Processing payment...</Box> {/* Add your text here */}
          </Box>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 1 }}
        >
          Submit Payment
        </Button>
      </form>
    </div>
  );
}

export default Payment;
