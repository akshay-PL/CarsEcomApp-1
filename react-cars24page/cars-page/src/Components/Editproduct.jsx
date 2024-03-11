import React, { useState, useEffect } from "react";
import withAuth from "./PrivateRoute";
import axios from "axios";
import "./Editproduct.css"; // Import your independent CSS module

import { useParams } from "react-router-dom";

const Editproduct = () => {
  const [carDetails, setCarDetails] = useState(null);
  const { id } = useParams();
  const [editedDetails, setEditedDetails] = useState({
    brand: "",
    type: "",
    model: "",
    year: "",
    price: "",
    stock_quantity: "",
    description: "",
    productimage: "",
  });
  const [base64Image, setBase64Image] = useState("");
  const [file, setFile] = useState(null);

  const fetchCarById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/cars/${id}`);
      setCarDetails(response.data);
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  useEffect(() => {
    fetchCarById(id);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file); // Store the selected file
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setBase64Image(base64String);
      setEditedDetails({ ...editedDetails, productimage: base64String }); // Update productimage field
    };
    reader.readAsDataURL(file);
  };

  const submitEdit = async () => {
    try {
      const updatedDetails = {
        brand: editedDetails.brand || carDetails.brand,
        type: editedDetails.type || carDetails.type,
        model: editedDetails.model || carDetails.model,
        year: editedDetails.year || carDetails.year,
        price: editedDetails.price || carDetails.price,
        stock_quantity:
          editedDetails.stock_quantity || carDetails.stock_quantity,
        description: editedDetails.description || carDetails.description,
        productimage: editedDetails.productimage || carDetails.productimage,
      };

      const response = await axios.put(
        `http://localhost:3000/cars/${id}`,
        updatedDetails
      );

      if (response.status === 200) {
        alert("Car details updated successfully");
      }
    } catch (error) {
      console.error("Error updating car details:", error);
    }
  };

  return (
    <div className="editproduct-container">
      {carDetails ? (
        <div className="editproduct-details">
          <p className="editproduct-item">Brand: {carDetails.brand}</p>
          <p className="editproduct-item">Type: {carDetails.type}</p>
          <p className="editproduct-item">Model: {carDetails.model}</p>
          <p className="editproduct-item">Year: {carDetails.year}</p>
          <p className="editproduct-item">Price: {carDetails.price}</p>
          <p className="editproduct-item">Stock: {carDetails.stock_quantity}</p>
          <p className="editproduct-item">
            Description: {carDetails.description}
          </p>
          <input
            type="text"
            name="brand"
            className="editproduct-input"
            placeholder="Edit Brand"
            onChange={handleInputChange}
            value={editedDetails.brand}
          />
          <input
            type="text"
            name="type"
            className="editproduct-input"
            placeholder="Edit Type"
            onChange={handleInputChange}
            value={editedDetails.type}
          />
          <input
            type="text"
            name="model"
            className="editproduct-input"
            placeholder="Edit Model"
            onChange={handleInputChange}
            value={editedDetails.model}
          />
          <input
            type="text"
            name="year"
            className="editproduct-input"
            placeholder="Edit Year"
            onChange={handleInputChange}
            value={editedDetails.year}
          />
          <input
            type="text"
            name="price"
            className="editproduct-input"
            placeholder="Edit Price"
            onChange={handleInputChange}
            value={editedDetails.price}
          />
          <input
            type="text"
            name="stock_quantity"
            className="editproduct-input"
            placeholder="Edit Stock"
            onChange={handleInputChange}
            value={editedDetails.stock_quantity}
          />
          <input
            type="text"
            name="description"
            className="editproduct-input"
            placeholder="Edit Description"
            onChange={handleInputChange}
            value={editedDetails.description}
          />
          <input
            type="text"
            name="productimage"
            className="editproduct-input"
            placeholder="Edit Image"
            onChange={handleInputChange}
            value={editedDetails.productimage}
          />
          <input type="file" name="productimage" onChange={handleFileChange} />
          <button onClick={submitEdit} className="editproduct-button">
            Submit Edit
          </button>
        </div>
      ) : (
        <p className="editproduct-loading">Loading...</p>
      )}
    </div>
  );
};

export default withAuth(Editproduct);
