import React, { useState } from 'react';

function CheckoutPage() {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to server)
    };

    return (
        <div className="container">
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                <h2>Shipping Information</h2>
                <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Full Name" required /><br /><br />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required /><br /><br />
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required /><br /><br />
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required /><br /><br />
                <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} placeholder="Zip Code" required /><br /><br />

                <h2>Payment Information</h2>
                <input type="text" name="cardname" value={formData.cardname} onChange={handleChange} placeholder="Name on Card" required /><br /><br />
                <input type="text" name="cardnumber" value={formData.cardnumber} onChange={handleChange} placeholder="Card Number" required /><br /><br />
                <input type="text" name="expmonth" value={formData.expmonth} onChange={handleChange} placeholder="Expiry Month" required /><br /><br />
                <input type="text" name="expyear" value={formData.expyear} onChange={handleChange} placeholder="Expiry Year" required /><br /><br />
                <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="CVV" required /><br /><br />

                <button type="submit" className="checkout-btn">Buy Now</button>
            </form>
        </div>
    );
}

export default CheckoutPage;
