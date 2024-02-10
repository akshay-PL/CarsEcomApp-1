const express = require('express');
const router = express.Router();
const sql = require('mssql');

// GET all user credentials
router.get('/', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM User_credential`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching user credentials:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET user credential by ID
router.get('/:id', async (req, res) => {
  const userCredentialId = req.params.id;
  try {
    const result = await sql.query`SELECT * FROM User_credential WHERE id = ${userCredentialId}`;
    
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'User credential not found' });
    }
  } catch (error) {
    console.error('Error fetching user credential by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new user credential
router.post('/', async (req, res) => {
  const { userId, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await sql.query`INSERT INTO User_credential (userId, password, createdAt, createdBy) 
                                    VALUES (${userId}, ${hashedPassword}, GETDATE(), ${createdBy})`;

    res.status(201).json({ message: 'User credentials created successfully' });
  } catch (error) {
    console.error('Error creating user credentials:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update user credential by ID
router.put('/:id', async (req, res) => {
  const userCredentialId = req.params.id;
  const { password } = req.body;
  try {
    const result = await sql.query`UPDATE User_credential SET password = ${password} WHERE id = ${userCredentialId}`;
    res.json({ message: 'User credential updated successfully' });
  } catch (error) {
    console.error('Error updating user credential:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE user credential by ID
router.delete('/:id', async (req, res) => {
  const userCredentialId = req.params.id;
  try {
    const result = await sql.query`DELETE FROM User_credential WHERE id = ${userCredentialId}`;
    res.json({ message: 'User credential deleted successfully' });
  } catch (error) {
    console.error('Error deleting user credential:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
