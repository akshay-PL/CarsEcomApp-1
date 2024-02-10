const express = require('express');
const router = express.Router();
const sql = require('mssql');

// GET all users
router.get('/', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Users`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await sql.query`SELECT * FROM Users WHERE id = ${userId}`;
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const result = await sql.query`INSERT INTO Users (username, email, password) VALUES (${username}, ${email}, ${password})`;
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update user by ID
router.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, email } = req.body;
  try {
    const result = await sql.query`UPDATE Users SET username=${username}, email=${email} WHERE id = ${userId}`;
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE user by ID
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await sql.query`DELETE FROM Users WHERE id = ${userId}`;
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
