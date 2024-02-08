import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/main');
  };

  // Random general answers for FAQs
  const faqAnswers = [
    "You can track your order by logging into your account and viewing your order history.",
    "Our return policy allows returns within 30 days of purchase for a full refund.",
    "Yes, we offer international shipping to most countries.",
    "You can contact our customer support team via email at support@carsrcom.com or by phone at (123) 456-7890.",
  ];

  // Function to generate a random answer from the faqAnswers array
  const generateRandomAnswer = () => {
    const randomIndex = Math.floor(Math.random() * faqAnswers.length);
    return faqAnswers[randomIndex];
  };

  return (
    <div className="contact-container">
      <div className="contact-button-container">
        <button className="contact-go-back-button" onClick={handleGoBack} style={{ position: 'absolute', top: '70px', left: '-5px', margin: '7px' }}>
          <span>&#8592;</span>
        </button>
      </div>
      <div className="contact-info-box">
        <div className="contact-grid-container">
          <div className="contact-grid-item">
            <h2>Company: CarsEcom</h2>
            <p>Email: info@carsrcom.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 456 Auto Lane, Citytown, State, 56789</p>
          </div>
          <div className="contact-grid-item">
            <h2>Business Hours</h2>
            <p>Monday-Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
          <div className="contact-grid-item">
            <h2>FAQs</h2>
            <ul>
              <li>How can I track my order? - {generateRandomAnswer()}</li>
              <li>What is your return policy? - {generateRandomAnswer()}</li>
              <li>Do you offer international shipping? - {generateRandomAnswer()}</li>
              <li>How do I contact customer support? - {generateRandomAnswer()}</li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="contact-footer"></footer>
    </div>
  );
};

export default Contact;
