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
        if (!email || !password) {
            console.log('Login failed: Email and Password are required');
            return;
        }

        // Make API call to fetch user data
        const response = await axios.get('http://localhost:3000/users');

        // Log the entire response for debugging purposes
        console.log(response.data);

        // Check if the entered email and password match any user's data
        const userDataArray = response.data;
        const user = userDataArray.find((user) => user.email === email && user.username === password);

        // Log user data for debugging purposes
        console.log('User Data:', user);

        if (user) {
            console.log('Login Successful');
            setShowMain(true);
            navigate('/main'); // Navigate to '/main' upon successful login
        } else {
            console.log('Login failed: Invalid credentials');
        }
    } catch (error) {
        console.error('Error during login:', error);
        setShowMain(false);
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
              className="submit-button"
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
