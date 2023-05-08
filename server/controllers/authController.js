const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authValidator = require('../validators/authValidator');
const registrationDB = require('../db/registration');
const getUserByEmail = registrationDB.getUserByEmail;
const createUser = registrationDB.createUser;

const { comparePasswords } = require('../utils/auth');
const { sendValidationError } = require('../utils/errors');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    // Validate the request body
    const { error } = registerValidation(req.body);
    if (error) {
      return sendValidationError(res, error.details[0].message);
    }

    // Check if a user with the same email already exists
    const existingUser = await getUserByEmail(req.body.email);
    if (existingUser) {
      return res.status(400).json({ error: 'A user with the same email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create the user
    const user = await createUser(req.body.email, hashedPassword);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    // Validate the request body
    const { error } = loginValidation(req.body);
    if (error) {
      return sendValidationError(res, error.details[0].message);
    }

    // Check if a user with the provided email exists
    const user = await getUserByEmail(req.body.email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored password
    const passwordsMatch = await comparePasswords(req.body.password, user.password);
    if (!passwordsMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
