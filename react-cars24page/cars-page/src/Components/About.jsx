import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css'; // Import your independent CSS module

const About = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/main');
  };

  return (
    <div className="about-container">
      <button className="about-go-back-button" onClick={handleGoBack}>
        Go back to Main
      </button>
      <div className="about-info-box">
        <h1>About: CarsEcom</h1>
        <p>Welcome to CarsEcom, where passion for cars meets seamless online shopping! We are a dedicated team of automotive enthusiasts, committed to providing you with an unparalleled shopping experience in the world of automobiles.</p>
        <p><strong>Our Mission</strong></p>
        <p>At CarsEcom, our mission is to make the process of buying and selling cars a breeze. We understand that a car is more than just a vehicle; it's an expression of individuality, freedom, and style. We aim to empower our customers with a curated selection of high-quality vehicles and an effortless online shopping journey.</p>
        <p><strong>Why Choose CarsEcom?</strong></p>
        <p>Quality Assurance: Every car on our platform undergoes rigorous inspection to ensure top-notch quality and reliability.</p>
        <p>Wide Selection: Explore a diverse range of cars, from sleek sedans to powerful SUVs, handpicked to cater to different tastes and preferences.</p>
        <p>User-Friendly Platform: We've designed our website to be intuitive and user-friendly, making it easy for you to find the perfect car.</p>
        <p>Transparent Transactions: Enjoy transparent pricing and detailed information about each vehicle, empowering you to make informed decisions.</p>
        <p><strong>The CarsEcom Difference</strong></p>
        <p>Passionate Team: Our team comprises automotive experts who share your passion for cars. We're here to assist you at every step of the way.</p>
        <p>Customer-Centric Approach: Your satisfaction is our priority. We are committed to providing excellent customer service and support.</p>
        <p>Innovation: We embrace technology to create a modern and seamless car shopping experience. Stay tuned for exciting features and updates!</p>
        <p><strong>Connect With Us</strong></p>
        <p>Join the CarsEcom community! Follow us on social media for the latest updates, car tips, and community events. We love hearing from our customers, so feel free to reach out with any questions or feedback.</p>
        <p>Thank you for choosing CarsEcom for your automotive needs. Let's embark on a journey of discovering and driving your dream car together!</p>
      </div>
      <footer className="about-page-footer"></footer>
    </div>
  );
};

export default About;
