import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axiosInstance from "./Axiosinterceptor.jsx";
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
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("");
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
        sessionStorage.setItem("token", response.data.auth);
        let user = {
          userName: response.data.user.username,
          email: response.data.user.email,
          role: response.data.user.role,
        };
        sessionStorage.setItem("user", JSON.stringify(user));

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
          firstname,
          lastname,
          address,
          date_of_birth: dateOfBirth,
          contact,
          role,
        }
      );

      console.log("Signup response:", response);

      if (response.status === 201) {
        console.log("Signup successful");
        alert("User registered successfully!");
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
    navigate("/forgotpassword");
  };

  const resetFields = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setAddress("");
    setDateOfBirth("");
    setContact("");
    setRole("");
  };

  const handleToggleMain = () => {
    setShowMain(!showMain);
  };

  const handleToggleAction = () => {
    setAction(action === "Login" ? "Sign up" : "Login");
    resetFields();
    setErrorMessage("");
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

          {action === "Sign up" && (
            <>
              <div className="input">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="input">
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="Contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <div className="input">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Role"
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
            </>
          )}
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
