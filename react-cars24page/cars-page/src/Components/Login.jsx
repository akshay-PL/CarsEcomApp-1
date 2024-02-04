// Login.jsx
import React, { useState } from 'react';
import './Login.css';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';
import user_icon from './Assets/person.png';
import Main from './Main'; // Import Main component
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storedEmail, setStoredEmail] = useState('akshay@gmail.com');
  const [storedPassword, setStoredPassword] = useState('password123');
  const [showMain, setShowMain] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleSignup = () => {
    console.log('Signup clicked');
  };

  const handleLogin = () => {
    console.log('Login clicked');
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password clicked');
  };

  const handleSubmitButton = () => {
    handleLoginuser();
  };

  const handleLoginuser = () => {
    if (action === 'Login') {
      if (email === storedEmail && password === storedPassword) {
        console.log('Login Successful');
        setShowMain(true);
        navigate('/main'); // Navigate to '/main' on successful login
      } else if (email === storedEmail) {
        console.log('Email is correct, password invalid');
      } else if (password === storedPassword) {
        console.log('Password is correct, email invalid');
      } else {
        console.log('Invalid credentials');
      }
    } else {
      console.log('Handling user for signup action - information not found');
    }
    setSubmitClicked(true);
  };

  const resetFields = () => {
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
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            {action === 'Sign up' && (
              <div className="input">
                <img src={user_icon} alt="" />
                <input type="text" placeholder="Name" />
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

          {/* Submit Button */}
          <div
            className="submit-button"
            onClick={() => {
              handleSubmitButton();
              resetFields();
            }}
          >
            {action === 'Sign up' ? 'Set Login' : 'Login'}
          </div>

          {/* Login/signup button */}
          <div className="submit-container">
            <div
              className={action === 'Login' ? 'submit gray' : 'submit'}
              onClick={() => {
                setAction('Sign up');
                handleSignup();
                resetFields();
              }}
            >
              Signup
            </div>
            <div
              className={action === 'Sign up' ? 'submit gray' : 'submit'}
              onClick={() => {
                setAction('Login');
                handleLogin();
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
