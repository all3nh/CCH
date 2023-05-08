const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const { HttpError } = require('../utils/errors');
const pool = require('../db/database');

// POST /api/register
router.post('/', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const newUser = await registrationController.registerUser(client, username, password, email);
      await client.query('COMMIT');
      return res.status(201).json(newUser);
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(error);
      if (error.code === '23505') {
        return res.status(409).json({ error: 'User with that email already exists' });
      }
      return res.status(500).json({ error: 'Server error' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
