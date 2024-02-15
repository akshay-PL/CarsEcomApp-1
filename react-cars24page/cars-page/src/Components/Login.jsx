import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axiosInstance from "./Axiosinterceptor.jsx"; // Import the axios instance
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";
import user_icon from "./Assets/person.png";
import Main from "./Main";

const LoginSignup = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMain, setShowMain] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      setErrorMessage("");
      console.log("Logging in...");

      if (!email || !password) {
        setErrorMessage("Email and password are required");
        return;
      }

      const response = await axiosInstance.post("http://localhost:3000/login", {
        email,
        password,
      });
      console.log("Login response:", response);

      if (response.status === 200) {
        console.log("Login successful");
        localStorage.setItem("token", response.data.auth);
        let user = {
          userName: response.data.user.username,
          email: response.data.user.email,
        };
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/main");
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login");
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/signup",
        {
          username,
          email,
          password,
        }
      );

      console.log("Signup response:", response);

      if (response.status === 201) {
        console.log("Signup successful");
        alert("User registered successfully!");
        // Optionally, you can automatically log in the user after signup
        await handleLogin();
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage(
        "Signup failed. Make sure all fields are entered for registering."
      );
    }
  };

  const handleForgotPassword = () => {
    alert("Currently not functional. Update is coming soon !");
  };

  const resetFields = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleToggleMain = () => {
    setShowMain(!showMain);
  };

  const handleToggleAction = () => {
    setAction(action === "Login" ? "Sign up" : "Login");
    resetFields();
    setErrorMessage(""); // Reset error message when switching between login and signup
  };

  return (
    <div className="container">
      <div>
        <div className="header">
          <div className="text">
            CarsEcom<div className="underline"></div>
          </div>
        </div>

        <div className="inputs">
          {action === "Sign up" && (
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Email id / Mobile no."
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

        {action === "Login" && (
          <p className="forgot-password" onClick={handleForgotPassword}>
            Forgot Password? <span>Click here </span>
          </p>
        )}

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="submit-button-container">
          {action === "Sign up" ? (
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

          <button className="toggle-action-button" onClick={handleToggleAction}>
            {action === "Login" ? "Sign Up" : "Login"}
          </button>
        </div>

        {showMain && (
          <button className="toggle-main-button" onClick={handleToggleMain}>
            Hide Main
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
