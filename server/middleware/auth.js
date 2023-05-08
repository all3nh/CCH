const jwt = require('jsonwebtoken');
const { pool } = require('../db/database');

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the request header
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token and get the user ID from it
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Get the user from the database
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = rows[0];

    // Attach the user object to the request object
    req.user = user;

    // Call the next middleware function
    next();
  } catch (error) {
    // Return a 401 Unauthorized error if the token is invalid or missing
    return res.status(401).json({ error: 'Invalid or missing token' });
  }
};

module.exports = authMiddleware;
