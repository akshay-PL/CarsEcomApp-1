import React, { useState, useEffect } from "react";
import withAuth from "./PrivateRoute";
import axios from "axios";
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
      setBase64Image(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submitEdit = async () => {
    try {
      const updatedDetails = {
        brand: editedDetails.editedBrand || carDetails.brand,
        type: editedDetails.editedType || carDetails.type,
        model: editedDetails.editedModel || carDetails.model,
        year: editedDetails.editedYear || carDetails.year,
        price: editedDetails.editedPrice || carDetails.price,
        stock_quantity: editedDetails.editedStock || carDetails.stock_quantity,
        description: editedDetails.editedDescription || carDetails.description,
        productimage: editedDetails.editimage || carDetails.productimage,
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

  const handleConvert = () => {
    if (base64Image.startsWith("data:")) {
      const base64WithoutPrefix = base64Image.split(",")[1];
      setBase64Image(base64WithoutPrefix);
    }
  };

  return (
    <div>
      {carDetails ? (
        <div>
          <p>Brand: {carDetails.brand}</p>
          <p>Type: {carDetails.type}</p>
          <p>Model: {carDetails.model}</p>
          <p>Year: {carDetails.year}</p>
          <p>Price: {carDetails.price}</p>
          <p>Stock: {carDetails.stock_quantity}</p>
          <p>Description: {carDetails.description}</p>
          <p>Image: {carDetails.productimage}</p>
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
          <input type="file" name="productimage" onChange={handleFileChange} />
          <button onClick={handleConvert}>Convert</button>
          <textarea
            value={base64Image}
            rows="10"
            cols="50"
            placeholder="Base64 Image"
            readOnly
          ></textarea>
          <button onClick={submitEdit}>Submit Edit</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default withAuth(Editproduct);
