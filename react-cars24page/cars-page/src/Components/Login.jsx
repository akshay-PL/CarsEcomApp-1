// Login.jsx
import React, { useState } from 'react';
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
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      setErrorMessage('');
  
      if (!email || !password) {
        setErrorMessage('Email and password are required');
        return;
      }
  
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        navigate('/main');
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login');
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
  
      // Check if signup was successful
      if (response.status === 200) {
        // Display alert on successful signup
        alert('User registered successfully!');
        console.log('Signup Successful:', response.data);
        
        // You might want to do something after successful signup
      } else {
        // Display alert if signup failed
        alert('Signup failed. Please try again.');
        console.error('Signup failed:', response.data.error);
      }
    } catch (error) {
      // Display alert if an error occurred during signup
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
    <div className="container">
      {showMain ? (
        <Main />
      ) : (
        <div>
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

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="submit-button-container">
            {action === 'Sign up' ? (
              <button
                className="submit-button signup"
                onClick={() => {
                  handleSignup();
                  resetFields();
                }}
              >
                Sign Up
              </button>
            ) : (
              <button
                className="submit-button"
                onClick={() => {
                  handleLogin();
                  resetFields();
                }}
              >
                Login
              </button>
            )}

            <button
              className="toggle-action-button"
              onClick={() => {
                setAction(action === 'Login' ? 'Sign up' : 'Login');
                resetFields();
              }}
            >
              {action === 'Login' ? 'Sign Up' : 'Login'}
            </button>
          </div>

          {showMain && (
            <button className="toggle-main-button" onClick={handleToggleMain}>
              Hide Main
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
