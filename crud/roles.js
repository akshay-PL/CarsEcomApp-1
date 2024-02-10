const express = require('express');
const router = express.Router();
const sql = require('mssql');

// GET all roles
router.get('/', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Roles`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET role by ID
router.get('/:id', async (req, res) => {
  const roleId = req.params.id;
  try {
    const result = await sql.query`SELECT * FROM Roles WHERE id = ${roleId}`;
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (error) {
    console.error('Error fetching role by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new role
router.post('/', async (req, res) => {
  const { roleName } = req.body;
  if (!roleName) {
    return res.status(400).json({ error: 'RoleName is required in the request body' });
  }

  try {
    const result = await sql.query`INSERT INTO Roles (roleName) VALUES (${roleName})`;
    console.log(result);  // Log the result for debugging
    res.status(201).json({ message: 'Role created successfully' });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

// PUT update role by ID
router.put('/:id', async (req, res) => {
  const roleId = req.params.id;
  const { roleName } = req.body;
  try {
    const result = await sql.query`UPDATE Roles SET roleName=${roleName} WHERE id = ${roleId}`;
    console.log(result);  // Log the result for debugging
    res.json({ message: 'Role updated successfully' });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

// DELETE role by ID
router.delete('/:id', async (req, res) => {
  const roleId = req.params.id;
  try {
    const result = await sql.query`DELETE FROM Roles WHERE id = ${roleId}`;
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
