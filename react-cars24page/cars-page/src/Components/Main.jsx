// Main.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Main.css';

import car1 from './Assets/car1.jpg';
import car2 from './Assets/car2.jpg';
import car3 from './Assets/car3.png';
import car4 from './Assets/car4.png';
import car5 from './Assets/car5.jpg';
import car6 from './Assets/car6.png';

const Main = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchData();
  }, []);

  const handleSeeDetails = (carId) => {
    const selected = cars.find((car) => car.id === carId);
    setSelectedCar(selected);
    navigate(`/details/${carId}`, { state: { image: getCarImage(carId) } });
  };

  const handleBuyClick = (carId) => {
    const selected = cars.find((car) => car.id === carId);
    setSelectedCar(selected);
    navigate(`/details/${carId}`, { state: { image: getCarImage(carId) } });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getCarImage = (carId) => {
    switch (carId) {
      case 1:
        return car1;
      case 2:
        return car2;
      case 3:
        return car3;
      case 4:
        return car4;
      case 5:
        return car5;
      case 6:
        return car6;
      default:
        return '';
    }
  };

  const totalPageCount = Math.ceil(cars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCars = cars.slice(startIndex, endIndex);

  return (
    <div className="container">
      {selectedCar ? (
        <div className={`car${selectedCar.id} carDetails`}>
          <h3>{selectedCar.brand}</h3>
          <img src={getCarImage(selectedCar.id)} alt="" className={`car${selectedCar.id}-image`} />
          <div>
            <p style={{ fontSize: '16px', color: '#3498db', fontWeight: 'bold' }}>Brand: {selectedCar.brand}</p>
            <p style={{ fontSize: '14px', color: '#2ecc71', fontWeight: 'bold' }}>Type: {selectedCar.type}</p>
            <p style={{ fontSize: '14px', color: '#2ecc71', fontWeight: 'bold' }}>Model: {selectedCar.model}</p>
            <p style={{ fontSize: '14px', color: '#2ecc71', fontWeight: 'bold' }}>Price: {selectedCar.price}</p>
            <button
              style={{
                background: '#e74c3c',
                color: '#fff',
                fontSize: '16px',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
              onClick={() => handleBuyClick(selectedCar.id)}
            >
              Buy
            </button>
          </div>
        </div>
      ) : (
        displayedCars.map((car) => (
          <div key={car.id} className={`car${car.id} carDetails`} onClick={() => handleSeeDetails(car.id)}>
            <h3>{car.brand}</h3>
            <img src={getCarImage(car.id)} alt="" className={`car${car.id}-image`} />
            <div>
              <p style={{ fontSize: '16px', color: '#ffffff', fontWeight: 'bold' }}>Brand: {car.brand}</p>
              <p style={{ fontSize: '14px', color: '#34495e', fontWeight: 'bold' }}>Type: {car.type}</p>
              <p style={{ fontSize: '14px', color: '#34495e', fontWeight: 'bold' }}>Model: {car.model}</p>
              <p style={{ fontSize: '14px', color: '#34495e', fontWeight: 'bold' }}>Price: {car.price}</p>
              <button
                style={{
                  background: '#e74c3c',
                  color: '#fff',
                  fontSize: '14px',
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                }}
                onClick={() => handleBuyClick(car.id)}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))
      )}
      {/* Previous and Next buttons */}
      <div style={{ gridColumn: 'span 3', textAlign: 'center', marginTop: '20px' }}>
        <button
          style={{
            background: '#3498db',
            color: '#fff',
            fontSize: '14px',
            padding: '6px 12px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background 0.3s',
            marginRight: '10px',
          }}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          &#8592; {/* Unicode arrow character for left arrow */}
        </button>
        <span style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 10px' }}>{currentPage}</span>
        <button
          style={{
            background: '#3498db',
            color: '#fff',
            fontSize: '14px',
            padding: '6px 12px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
          onClick={handleNextPage}
          disabled={currentPage === totalPageCount}
        >
          &#8594; {/* Unicode arrow character for right arrow */}
        </button>
      </div>
    </div>
  );
};

export default Main;
