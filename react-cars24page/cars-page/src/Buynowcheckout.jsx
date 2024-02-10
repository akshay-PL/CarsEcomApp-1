import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Buynowcheckout.css';

function CheckoutPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [carDetails, setCarDetails] = useState(null);
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        address: '',
        city: '',
        zipcode: '',
        cardname: '',
        cardnumber: '',
        expmonth: '',
        expyear: '',
        cvv: ''
    });

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/cars/${id}`);
                setCarDetails(response.data);
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };

        fetchCarDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Order placed successfully');
    };

    return (
        <div className="checkout-container">
            <button
                onClick={() => navigate('/main')}
                className="checkout-back-to-main-button"
            >
                <span>&#9664;</span>
            </button>
            <h1 className="checkout-heading">Checkout</h1>
            <form onSubmit={handleSubmit} className="checkout-form">
                {carDetails && (
                    <div className="product-info">
                        <h2>Product Information</h2>
                        <p>Brand: {carDetails.brand}</p>
                        <p>Type: {carDetails.type}</p>
                        <p>Model: {carDetails.model}</p>
                        <p>Price: {carDetails.price}</p>
                    </div>
                )}
                <div className="shipping-info">
                    <h2>Shipping Information</h2>
                    <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Full Name" required className="input-field" /><br /><br />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="input-field" /><br /><br />
                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required className="input-field" /><br /><br />
                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="input-field" /><br /><br />
                    <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} placeholder="Zip Code" required className="input-field" /><br /><br />
                </div>

                <div className="payment-info">
                    <h2>Payment Information</h2>
                    <input type="text" name="cardname" value={formData.cardname} onChange={handleChange} placeholder="Name on Card" required className="input-field" /><br /><br />
                    <input type="text" name="cardnumber" value={formData.cardnumber} onChange={handleChange} placeholder="Card Number" required className="input-field" /><br /><br />
                    <input type="text" name="expmonth" value={formData.expmonth} onChange={handleChange} placeholder="Expiry Month" required className="input-field" /><br /><br />
                    <input type="text" name="expyear" value={formData.expyear} onChange={handleChange} placeholder="Expiry Year" required className="input-field" /><br /><br />
                    <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="CVV" required className="input-field" /><br /><br />
                </div>

                <button type="submit" className="checkout-button">Buy</button>
            </form>
        </div>
    );
}

export default CheckoutPage;
