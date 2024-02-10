// userMapRolesRouter.js
const express = require('express');
const router = express.Router();
const sql = require('mssql');

// GET all user-role mappings
router.get('/', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM UserMapRoles`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching user-role mappings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET user-role mappings by userId
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await sql.query`SELECT * FROM UserMapRoles WHERE userId = ${userId}`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching user-role mappings by userId:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new user-role mapping
router.post('/', async (req, res) => {
  const { userId, roleId } = req.body;
  try {
    const result = await sql.query`INSERT INTO UserMapRoles (userId, roleId) VALUES (${userId}, ${roleId})`;
    res.status(201).json({ message: 'User-role mapping created successfully' });
  } catch (error) {
    console.error('Error creating user-role mapping:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update user-role mapping by userId and roleId
router.put('/:userId/:roleId', async (req, res) => {
  const { userId, roleId } = req.params;
  const newRoleId = req.body.newRoleId;
  try {
    const result = await sql.query`UPDATE UserMapRoles SET roleId = ${newRoleId} WHERE userId = ${userId} AND roleId = ${roleId}`;
    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ error: 'User-role mapping not found' });
    } else {
      res.status(200).json({ message: 'User-role mapping updated successfully' });
    }
  } catch (error) {
    console.error('Error updating user-role mapping:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE user-role mapping by userId and roleId
router.delete('/:userId/:roleId', async (req, res) => {
  const { userId, roleId } = req.params;
  try {
    const result = await sql.query`DELETE FROM UserMapRoles WHERE userId = ${userId} AND roleId = ${roleId}`;
    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ error: 'User-role mapping not found' });
    } else {
      res.status(200).json({ message: 'User-role mapping deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting user-role mapping:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
