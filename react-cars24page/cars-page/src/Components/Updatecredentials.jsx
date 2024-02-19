import React, { useState, useEffect } from "react";
import axios from "axios";
import withAuth from "./PrivateRoute";

const UpdateCredentials = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Get username from local storage when component mounts
    const storedUsername = sessionStorage.getItem("userName");
    setUsername(storedUsername);
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/signup/${username}`,
        {
          email,
          password,
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        window.alert("User information updated successfully");
      } else {
        window.alert("Failed to update user information");
      }
    } catch (error) {
      console.error("Error updating credentials:", error);
      window.alert("Failed to update user information");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="New Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Credentials</button>
    </div>
  );
};

export default withAuth(UpdateCredentials);
