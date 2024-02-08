import React from 'react';

function CheckoutPage() {
    return (
        <div className="container">
            <h1>Checkout</h1>
            <div>
                <h2>Shipping Information</h2>
                <p>Full Name: John Doe</p>
                <p>Email: johndoe@example.com</p>
                <p>Address: 123 Main St</p>
                <p>City: Anytown</p>
                <p>Zip Code: 12345</p>
            </div>
            <div>
                <h2>Payment Information</h2>
                <p>Name on Card: John Doe</p>
                <p>Card Number: **** **** **** 1234</p>
                <p>Expiry Month: 12</p>
                <p>Expiry Year: 2025</p>
                <p>CVV: ***</p>
            </div>
            <button className="checkout-btn">Buy Now</button>
        </div>
    );
}

export default CheckoutPage;
