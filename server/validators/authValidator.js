const { body, validationResult } = require('express-validator');

const loginValidator = [
  body('email', 'Please enter a valid email').isEmail().normalizeEmail(),
  body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { loginValidator };
