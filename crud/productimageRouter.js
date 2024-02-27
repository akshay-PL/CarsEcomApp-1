const express = require('express');
const sql = require('mssql');
const router = express.Router();

// GET request to fetch all product images
router.get('/', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM productImage`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching product images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST request to create a new product image
router.post('/', async (req, res) => {
  const { converted } = req.body;
  try {
    await sql.connect(config);
    const result = await sql.query`INSERT INTO productImage (converted) VALUES (${converted})`;
    res.status(201).json({ message: 'Product image created successfully' });
  } catch (error) {
    console.error('Error creating product image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE request to delete a product image by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await sql.connect(config);
    const result = await sql.query`DELETE FROM productImage WHERE id = ${id}`;
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Product image not found' });
    }
    res.json({ message: 'Product image deleted successfully' });
  } catch (error) {
    console.error('Error deleting product image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
