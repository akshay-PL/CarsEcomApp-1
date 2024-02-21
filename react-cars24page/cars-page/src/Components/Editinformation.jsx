import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import withAuth from "./PrivateRoute";
import "./Editinformation.css";

const Editinformation = () => {
  const [userData, setUserData] = useState(null);
  const [editedData, setEditedData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    address: "",
    date_of_birth: "",
    contact: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [editableFields, setEditableFields] = useState({
    email: false,
    password: false,
    firstname: false,
    lastname: false,
    address: false,
    date_of_birth: false,
    contact: false,
  });

  useEffect(() => {
    const userString = sessionStorage.getItem("user");
    if (!userString) return;

    const user = JSON.parse(userString);
    const { userName } = user;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/signup/${userName}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        const dateOfBirth = data.date_of_birth
          ? data.date_of_birth.split("T")[0]
          : "";

        setUserData(data);
        setEditedData((prevData) => ({
          ...prevData,
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          address: data.address,
          date_of_birth: dateOfBirth,
          contact: data.contact,
          password: data.password, // Ensure password is set if provided by backend
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSave = async () => {
    const confirmed = window.confirm("Are you sure you want to save changes?");
    if (confirmed) {
      try {
        const userString = sessionStorage.getItem("user");
        if (!userString) return;

        const { userName } = JSON.parse(userString);

        const response = await fetch(
          `http://localhost:3000/signup/${userName}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedData),
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error updating data:", error);
      }
    } else {
      // User clicked cancel, do nothing or show a message
    }
  };

  const handleEditField = (fieldName) => {
    setEditableFields((prevEditableFields) => ({
      ...prevEditableFields,
      [fieldName]: true,
    }));
  };

  return (
    <div className="edit-container">
      <Button variant="contained" color="primary" className="hello-user-button">
        Hello User!
      </Button>

      <div className="edit-info">
        {userData && (
          <form>
            <div className="input-row">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={editedData.email}
                onChange={handleChange}
                className="input-field"
                disabled={!editableFields.email}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditField("email")}
              >
                Edit
              </Button>
            </div>
            <div className="input-row">
              <label>Password:</label>
              <div className="password-row">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={editedData.password}
                  onChange={handleChange}
                  className="input-field"
                  disabled={!editableFields.password}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditField("password")}
                >
                  Edit
                </Button>
              </div>
            </div>
            <div className="input-row">
              <label>First Name:</label>
              <input
                type="text"
                name="firstname"
                value={editedData.firstname}
                onChange={handleChange}
                className="input-field"
                disabled={!editableFields.firstname}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditField("firstname")}
              >
                Edit
              </Button>
            </div>
            <div className="input-row">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastname"
                value={editedData.lastname}
                onChange={handleChange}
                className="input-field"
                disabled={!editableFields.lastname}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditField("lastname")}
              >
                Edit
              </Button>
            </div>
            <div className="input-row">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={editedData.address}
                onChange={handleChange}
                className="input-field"
                disabled={!editableFields.address}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditField("address")}
              >
                Edit
              </Button>
            </div>
            <div className="input-row">
              <label>Date of Birth:</label>
              <input
                type="date"
                name="date_of_birth"
                value={editedData.date_of_birth}
                onChange={handleChange}
                className="input-field"
                disabled={!editableFields.date_of_birth}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditField("date_of_birth")}
              >
                Edit
              </Button>
            </div>
            <div className="input-row">
              <label>Contact:</label>
              <input
                type="text"
                name="contact"
                value={editedData.contact}
                onChange={handleChange}
                className="input-field"
                disabled={!editableFields.contact}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditField("contact")}
              >
                Edit
              </Button>
            </div>
          </form>
        )}
      </div>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  );
};

export default withAuth(Editinformation);
