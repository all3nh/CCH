const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const { sendServerError } = require('../utils/errors');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    await authController.register(req, res);
  } catch (error) {
    console.error(error);
    return sendServerError(res);
  }
});

// Log in a user
router.post('/login', passport.authenticate('local'), async (req, res) => {
  try {
    await authController.login(req, res);
  } catch (error) {
    console.error(error);
    return sendServerError(res);
  }
});

// Log out a user
router.post('/logout', async (req, res) => {
  try {
    await authController.logout(req, res);
  } catch (error) {
    console.error(error);
    return sendServerError(res);
  }
});

module.exports = router;
