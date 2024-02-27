import React, { useState } from "react";
import withAuth from "./PrivateRoute";
import axios from "axios";
import "./productstore.css";

const ProductStore = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64String, setBase64String] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const convertToBase64 = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1]; // Remove data URL prefix
        setBase64String(base64String);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      console.error("No file selected");
    }
  };

  const sendToBackend = async () => {
    try {
      await axios.post("http://localhost:3000/cars", {
        brand,
        type,
        model,
        year,
        price,
        stock_quantity: stock,
        description,
        productimage: base64String,
      });
      console.log("Data sent to backend successfully");
      // Optionally, you can clear the form fields or perform any other actions upon successful submission.
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <div className="product-container">
      <div className="product-input-container">
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleFileInputChange} />
        <button onClick={convertToBase64}>Convert</button>
        <button onClick={sendToBackend}>Send to Backend</button>
      </div>
    </div>
  );
};

export default withAuth(ProductStore);
