// Login.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';
import user_icon from './Assets/person.png';
import Main from './Main';

const LoginSignup = () => {
  const { userId, usernameParam, emailParam } = useParams();
  const navigate = useNavigate();
  const [action, setAction] = useState('Login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMain, setShowMain] = useState(false);
  const [signupErrorMessage, setSignupErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      // Clear previous error messages
      setSignupErrorMessage('');
  
      if (!email || !password) {
        setSignupErrorMessage('Email and password are required');
        alert('Login failed. Please use correct credentials.');
        return;
      }
  
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });
  
      // Check HTTP status code
      if (response.status === 200) {
        // Login successful
        navigate('/main');
      } else {
        // Login failed
        alert('Please enter valid email and password');
        console.log('Please enter valid email or password');
        console.error('Login failed:', response.data.error);
        // Handle error, show error message to the user, etc.
        setSignupErrorMessage('An error occurred during login');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle network errors
      setSignupErrorMessage('An error occurred during login');
      alert('Login failed. Please use correct credentials.');
    }
  };
  
  
  
  const handleSignup = async () => {
    try {
      // Make API call to signup
      const response = await axios.post('http://localhost:3000/signup', {
        username,
        email,
        password,
      });

      console.log('Signup Successful:', response.data);

      // You might want to do something after successful signup
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password clicked');
  };

  const resetFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleToggleMain = () => {
    setShowMain(!showMain);
  };

  return (
    <>
      {showMain ? (
        <Main />
      ) : (
        <div className="Container">
          <div className="header">
            <div className="text">CarsEcom<div className="underline"></div></div>
          </div>
          <div className="inputs">
            {action === 'Sign up' && (
              <div className="input">
                <img src={user_icon} alt="" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            )}
            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                placeholder="Email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {action === 'Login' && (
            <p className="forgot-password" onClick={handleForgotPassword}>
              Forgot Password? <span>Click here </span>
            </p>
          )}

          {signupErrorMessage && <p className="error-message">{signupErrorMessage}</p>}

          {/* Submit Buttons */}
          {action === 'Sign up' ? (
            <div
              className="submit-button signup" // Add appropriate class for signup button
              onClick={() => {
                handleSignup();
                resetFields();
              }}
            >
              Set Login
            </div>
          ) : (
            <div
              className="submit-button"
              onClick={() => {
                handleLogin();
                resetFields();
              }}
            >
              Login
            </div>
          )}

          {/* Login/signup buttons */}
          <div className="submit-container">
            <div
              className={action === 'Login' ? 'submit gray' : 'submit'}
              onClick={() => {
                setAction('Sign up');
                resetFields();
              }}
            >
              Signup
            </div>
            <div
              className={action === 'Sign up' ? 'submit gray' : 'submit'}
              onClick={() => {
                setAction('Login');
              }}
            >
              Sign in
            </div>
          </div>

          {/* Button to show/hide Main component */}
          {showMain && (
            <button className="toggle-main-button" onClick={handleToggleMain}>
              Hide Main
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default LoginSignup;
