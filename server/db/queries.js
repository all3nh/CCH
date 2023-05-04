// server/db/queries.js

const pool = require('./index.js');

async function getUserByUsername(username) {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
}

// ... more query functions

module.exports = {
  getUserByUsername,
  // ... export more query functions
};
