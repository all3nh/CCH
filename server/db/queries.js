const pool = require('./index.js');

async function getUserByUsername(username) {
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Unable to retrieve user by username');
  }
}

async function createUser(username, password) {
  try {
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Unable to create user');
  }
}

async function loginUser(username, password) {
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('Unable to login user');
  }
}

module.exports = {
  getUserByUsername,
  createUser,
  loginUser
};
