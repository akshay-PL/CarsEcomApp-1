import React, { useState } from "react";
import withAuth from "./PrivateRoute";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./productstore.css";

const ProductStore = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); // State for error message
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar
  const navigate = useNavigate();

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const sendToBackend = async () => {
    setError(""); // Reset error message on each form submission
    // Check if any field is empty
    if (
      !brand ||
      !type ||
      !model ||
      !year ||
      !price ||
      !stock ||
      !description ||
      !selectedFile
    ) {
      setError("All fields are required");
      return; // Exit the function early if any field is empty
    }

    // Convert the file to base64
    const base64String = await convertToBase64(selectedFile);

    // Check if base64 conversion fails
    if (!base64String) {
      setError("Failed to convert file to base64");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/cars", {
        brand,
        type,
        model,
        year,
        price,
        stock_quantity: stock,
        description,
        productimage: base64String,
      });

      // Check if the response status is 201
      if (response.status === 201) {
        setOpenSnackbar(true); // Open Snackbar on successful submission
        // Optionally, you can clear the form fields or perform any other actions upon successful submission.
      } else {
        console.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1]; // Remove data URL prefix
          resolve(base64String);
        };
        reader.readAsDataURL(file);
      } else {
        console.error("No file selected");
        reject("No file selected");
      }
    });
  };

  return (
    <div className="add-product-container">
      <button
        onClick={() => navigate("/main")}
        className="back-to-main-button"
        style={{
          position: "absolute",
          top: "70px",
          left: "-5px",
          margin: "7px",
        }}
      >
        <span>&#9664;</span>
      </button>
      <div className="product-input-container">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              error={error && !brand} // Show error if brand is empty and error state is not empty
              helperText={error && !brand ? error : ""} // Show error message
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              error={error && !type} // Show error if type is empty and error state is not empty
              helperText={error && !type ? error : ""} // Show error message
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            {/* Custom file input container */}
            <label className="custom-file-input-container">
              <span>Choose file</span>
              {/* Actual file input element */}
              <input
                type="file"
                accept="image/*"
                className="custom-file-input"
                onChange={handleFileInputChange}
              />
            </label>
          </Grid>
          <Grid item xs={12}>
            {/* Display selected file name */}
            {selectedFile && (
              <div className="selected-file-name">{selectedFile.name}</div>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button onClick={sendToBackend} variant="contained" color="primary">
              Add product
            </Button>
          </Grid>
        </Grid>
      </div>
      {/* Snackbar for displaying success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="success"
        >
          Product added successfully
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default withAuth(ProductStore);
