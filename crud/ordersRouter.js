// ordersRouter.js

const express = require('express');
const router = express.Router();
const sql = require('mssql');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Orders`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET order by ID
router.get('/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    const result = await sql.query`SELECT * FROM Orders WHERE id = ${orderId}`;
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  const { userId, order_date, total_amount } = req.body;
  try {
    const result = await sql.query`INSERT INTO Orders (userId, order_date, total_amount, createdBy) 
                                      VALUES (${userId}, ${order_date}, ${total_amount}, 1)`;
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an order by ID
router.put('/:id', async (req, res) => {
  const orderId = req.params.id;
  const { userId, order_date, total_amount } = req.body;
  try {
    const result = await sql.query`UPDATE Orders SET customerId=${userId}, order_date=${order_date}, 
                                      total_amount=${total_amount} WHERE id = ${orderId}`;
    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an order by ID
router.delete('/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    const result = await sql.query`DELETE FROM Orders WHERE id = ${orderId}`;
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
