import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function CheckoutPage() {
    const handleSubmit = (values, actions) => {
        // Handle form submission (e.g., send data to server)
        console.log(values);
        actions.setSubmitting(false); // You may remove this line if submission is asynchronous
    };

    return (
        <div className="container">
            <h1>Checkout</h1>
            <Formik
                initialValues={{
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
                }}
                validate={(values) => {
                    const errors = {};
                    // Add validation logic here if needed
                    return errors;
                }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <h2>Shipping Information</h2>
                        <Field type="text" name="fullname" placeholder="Full Name" required /><br /><br />
                        <ErrorMessage name="fullname" component="div" /><br />
                        <Field type="email" name="email" placeholder="Email" required /><br /><br />
                        <ErrorMessage name="email" component="div" /><br />
                        <Field type="text" name="address" placeholder="Address" required /><br /><br />
                        <ErrorMessage name="address" component="div" /><br />
                        <Field type="text" name="city" placeholder="City" required /><br /><br />
                        <ErrorMessage name="city" component="div" /><br />
                        <Field type="text" name="zipcode" placeholder="Zip Code" required /><br /><br />
                        <ErrorMessage name="zipcode" component="div" /><br />

                        <h2>Payment Information</h2>
                        <Field type="text" name="cardname" placeholder="Name on Card" required /><br /><br />
                        <ErrorMessage name="cardname" component="div" /><br />
                        <Field type="text" name="cardnumber" placeholder="Card Number" required /><br /><br />
                        <ErrorMessage name="cardnumber" component="div" /><br />
                        <Field type="text" name="expmonth" placeholder="Expiry Month" required /><br /><br />
                        <ErrorMessage name="expmonth" component="div" /><br />
                        <Field type="text" name="expyear" placeholder="Expiry Year" required /><br /><br />
                        <ErrorMessage name="expyear" component="div" /><br />
                        <Field type="text" name="cvv" placeholder="CVV" required /><br /><br />
                        <ErrorMessage name="cvv" component="div" /><br />

                        <button type="submit" disabled={isSubmitting}>Buy Now</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CheckoutPage;
