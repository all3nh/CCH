const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

async function registerUser(client, username, password, email) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();
  const query = {
    text: 'INSERT INTO users(user_id, username, password, email) VALUES($1, $2, $3, $4) RETURNING *',
    values: [userId, username, hashedPassword, email],
  };
  const { rows } = await client.query(query);
  return rows[0];
}

async function getUserByEmail(client, email) {
  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  };
  const { rows } = await client.query(query);
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
}

module.exports = {
  registerUser,
  getUserByEmail,
};
