// orderItemsRouter.js

const express = require('express');
const router = express.Router();
const sql = require('mssql');

// GET all order items
router.get('/', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM OrderItems`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching order items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET order item by ID
router.get('/:id', async (req, res) => {
  const orderItemId = req.params.id;
  try {
    const result = await sql.query`SELECT * FROM OrderItems WHERE id = ${orderItemId}`;
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'Order item not found' });
    }
  } catch (error) {
    console.error('Error fetching order item by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new order item
router.post('/', async (req, res) => {
  const { orderId, carId, quantity, item_price } = req.body;
  try {
    const result = await sql.query`INSERT INTO OrderItems (orderId, carId, quantity, item_price, createdBy) 
                                      VALUES (${orderId}, ${carId}, ${quantity}, ${item_price}, 1)`;
    res.status(201).json({ message: 'Order item created successfully' });
  } catch (error) {
    console.error('Error creating order item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an order item by ID
router.put('/:id', async (req, res) => {
  const orderItemId = req.params.id;
  const { orderId, carId, quantity, item_price } = req.body;
  try {
    const result = await sql.query`UPDATE OrderItems SET orderId=${orderId}, carId=${carId}, 
                                      quantity=${quantity}, item_price=${item_price} WHERE id = ${orderItemId}`;
    res.json({ message: 'Order item updated successfully' });
  } catch (error) {
    console.error('Error updating order item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an order item by ID
router.delete('/:id', async (req, res) => {
  const orderItemId = req.params.id;
  try {
    const result = await sql.query`DELETE FROM OrderItems WHERE id = ${orderItemId}`;
    res.json({ message: 'Order item deleted successfully' });
  } catch (error) {
    console.error('Error deleting order item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
