// carsRouter.js

const express = require('express');
const router = express.Router();
const sql = require('mssql');

// GET all cars
router.get('/', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Cars WHERE isDeleted = 0`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET car by ID
router.get('/:id', async (req, res) => {
  const carId = req.params.id;
  try {
    const result = await sql.query`SELECT * FROM Cars WHERE id = ${carId} AND isDeleted = 0`;
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    console.error('Error fetching car by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new car
router.post('/', async (req, res) => {
  const { brand, type, model, year, price, stock_quantity, description, productimage } = req.body;
  try {
    const result = await sql.query`INSERT INTO Cars (brand, type, model, year, price, stock_quantity, description, productimage, createdBy) 
                                      VALUES (${brand}, ${type}, ${model}, ${year}, ${price}, ${stock_quantity}, ${description}, ${productimage}, 1)`;
    res.status(201).json({ message: 'Car created successfully' });
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Update a car by ID
router.put('/:id', async (req, res) => {
  const carId = req.params.id;
  const { brand, type, model, year, price, stock_quantity, description,productimage } = req.body;
  try {
    const result = await sql.query`UPDATE Cars 
                                      SET brand=${brand}, type=${type}, model=${model}, year=${year}, price=${price}, 
                                          stock_quantity=${stock_quantity}, description=${description},productimage=${productimage},updatedAt = GETDATE(), updatedBy = 1 
                                      WHERE id = ${carId} AND isDeleted = 0`;
    res.json({ message: 'Car updated successfully' });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a car by ID
router.delete('/:id', async (req, res) => {
  const carId = req.params.id;
  try {
    const result = await sql.query`UPDATE Cars SET isDeleted = 1 WHERE id = ${carId} AND isDeleted = 0`;
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
