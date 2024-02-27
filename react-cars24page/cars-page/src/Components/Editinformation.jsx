import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"; // Import Box component for displaying error message
import withAuth from "./PrivateRoute";
import "./Editinformation.css";

const Editinformation = () => {
  const [userData, setUserData] = useState(null);
  const [editedData, setEditedData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    address: "",
    date_of_birth: "",
    contact: "",
  });
  const [editableFields, setEditableFields] = useState({
    email: false,
    firstname: false,
    lastname: false,
    address: false,
    date_of_birth: false,
    contact: false,
  });
  const [formError, setFormError] = useState(false); // State to manage form error

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

  const handleSave = async () => {
    // Check if any field is empty
    for (const key in editedData) {
      if (editedData[key].trim() === "") {
        setFormError(true);
        return;
      }
    }

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
      [fieldName]: !prevEditableFields[fieldName], // Toggle the value
    }));
  };

  return (
    <div className="edit-container">
      <Typography variant="h5" gutterBottom>
        User Information
      </Typography>

      <div className="edit-info">
        {userData && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="text"
                name="email"
                value={editedData.email}
                onChange={handleChange}
                fullWidth
                disabled={!editableFields.email}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => handleEditField("email")}
                      >
                        Edit
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="First Name"
                type="text"
                name="firstname"
                value={editedData.firstname}
                onChange={handleChange}
                fullWidth
                disabled={!editableFields.firstname}
                error={formError && !editedData.firstname.trim()} // Apply error state to the TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => handleEditField("firstname")}
                      >
                        Edit
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              {formError && !editedData.firstname.trim() && (
                <Box mt={1} color="error.main">
                  Required
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Last Name"
                type="text"
                name="lastname"
                value={editedData.lastname}
                onChange={handleChange}
                fullWidth
                disabled={!editableFields.lastname}
                error={formError && !editedData.lastname.trim()} // Apply error state to the TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => handleEditField("lastname")}
                      >
                        Edit
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              {formError && !editedData.lastname.trim() && (
                <Box mt={1} color="error.main">
                  Required
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                type="text"
                name="address"
                value={editedData.address}
                onChange={handleChange}
                fullWidth
                disabled={!editableFields.address}
                error={formError && !editedData.address.trim()} // Apply error state to the TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => handleEditField("address")}
                      >
                        Edit
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              {formError && !editedData.address.trim() && (
                <Box mt={1} color="error.main">
                  Required
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Date of Birth"
                type="date"
                name="date_of_birth"
                value={editedData.date_of_birth}
                onChange={handleChange}
                fullWidth
                disabled={!editableFields.date_of_birth}
                error={formError && !editedData.date_of_birth.trim()} // Apply error state to the TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => handleEditField("date_of_birth")}
                      >
                        Edit
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              {formError && !editedData.date_of_birth.trim() && (
                <Box mt={1} color="error.main">
                  Required
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contact"
                type="text"
                name="contact"
                value={editedData.contact}
                onChange={handleChange}
                fullWidth
                disabled={!editableFields.contact}
                error={formError && !editedData.contact.trim()} // Apply error state to the TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => handleEditField("contact")}
                      >
                        Edit
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              {formError && !editedData.contact.trim() && (
                <Box mt={1} color="error.main">
                  Required
                </Box>
              )}
            </Grid>
          </Grid>
        )}
      </div>
      <Button variant="text" color="primary" onClick={handleSave}>
        Update and Save
      </Button>
    </div>
  );
};

export default withAuth(Editinformation);
