import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentFormData, setPaymentFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });
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

    try {
      alert("Payment submitted successfully");
      navigate("/ordersummary"); // Navigate to ordersummary after successful payment
    } catch (error) {
      console.error("Error submitting payment:", error);
      alert("Failed to submit payment. Please try again.");
    }
  };

  return (
    <div>
      <h1>Select Payment Method</h1>
      <form onSubmit={handlePaymentSubmit}>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="creditCard"
            checked={paymentMethod === "creditCard"}
            onChange={handlePaymentMethodChange}
          />
          Credit Card
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={handlePaymentMethodChange}
          />
          Paypal
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="bankTransfer"
            checked={paymentMethod === "bankTransfer"}
            onChange={handlePaymentMethodChange}
          />
          Bank Transfer
        </label>
        <br />
        {paymentMethod === "creditCard" && (
          <div className="payment-info">
            <h2>Payment Information</h2>
            <input
              type="text"
              name="nameOnCard"
              value={paymentFormData.nameOnCard}
              onChange={handlePaymentChange}
              placeholder="Name on Card"
              required
              className="input-field"
            />
            <br />
            <input
              type="text"
              name="cardNumber"
              value={paymentFormData.cardNumber}
              onChange={handlePaymentChange}
              placeholder="Card Number"
              required
              className="input-field"
            />
            <br />
            <input
              type="text"
              name="expiryMonth"
              value={paymentFormData.expiryMonth}
              onChange={handlePaymentChange}
              placeholder="Expiry Month"
              required
              className="input-field"
            />
            <br />
            <input
              type="text"
              name="expiryYear"
              value={paymentFormData.expiryYear}
              onChange={handlePaymentChange}
              placeholder="Expiry Year"
              required
              className="input-field"
            />
            <br />
            <input
              type="text"
              name="cvv"
              value={paymentFormData.cvv}
              onChange={handlePaymentChange}
              placeholder="CVV"
              required
              className="input-field"
            />
            <br />
          </div>
        )}
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
}

export default Payment;
