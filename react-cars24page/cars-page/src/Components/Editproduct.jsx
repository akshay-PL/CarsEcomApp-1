import React, { useState, useEffect } from "react";
import withAuth from "./PrivateRoute";
import axios from "axios";
import { useParams } from "react-router-dom";

const Editproduct = () => {
  // State to store the car details
  const [carDetails, setCarDetails] = useState(null);
  const { id } = useParams(); // Get the ID from the URL

  // State to store the edited car details
  const [editedDetails, setEditedDetails] = useState({
    brand: "",
    type: "",
    model: "",
    year: "",
    price: "",
    stock_quantity: "",
    description: "",
    productimage: "", // Keep it as an empty string
  });

  // State to store the base64 image string
  const [base64Image, setBase64Image] = useState("");

  // Function to fetch car details by ID
  const fetchCarById = async (id) => {
    try {
      // Make a GET request to fetch data by ID
      const response = await axios.get(`http://localhost:3000/cars/${id}`);
      // Set the fetched data to the state
      setCarDetails(response.data);
    } catch (error) {
      console.error("Error fetching car details:", error);
      // Handle errors if any
    }
  };

  // Fetch car details when the component mounts
  useEffect(() => {
    fetchCarById(id); // Use the ID from the URL
  }, [id]); // Fetch whenever the ID changes

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  // Function to handle file input change and conversion
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Function to handle conversion
  const handleConvert = () => {
    // The base64 image string is already stored in 'base64Image'
    console.log("Base64 Image:", base64Image);
    // Here you can perform any additional operations with the base64 image string
  };

  return (
    <div>
      {carDetails ? (
        <div>
          {/* Display car details */}
          <p>Brand: {carDetails.brand}</p>
          <p>Type: {carDetails.type}</p>
          <p>Model: {carDetails.model}</p>
          <p>Year: {carDetails.year}</p>
          <p>Price: {carDetails.price}</p>
          <p>Stock: {carDetails.stock_quantity}</p>
          <p>Description: {carDetails.description}</p>
          <p>Image: {carDetails.productimage}</p>
          {/* Additional input fields for editing */}
          <input
            type="text"
            name="editedBrand"
            placeholder="Edit Brand"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="editedType"
            placeholder="Edit Type"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="editedModel"
            placeholder="Edit Model"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="editedYear"
            placeholder="Edit Year"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="editedPrice"
            placeholder="Edit Price"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="editedStock"
            placeholder="Edit Stock"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="editedDescription"
            placeholder="Edit Description"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="editimage"
            placeholder="Edit Image"
            onChange={handleInputChange}
          />
          <input
            type="file"
            name="productimage"
            onChange={handleFileChange} // Use the file change handler
          />
          <button onClick={handleConvert}>Convert</button>
          {/* Display base64 image string */}
          <textarea
            value={base64Image}
            rows="10"
            cols="50"
            placeholder="Base64 Image"
            readOnly
          ></textarea>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default withAuth(Editproduct);
