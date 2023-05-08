const { Pool } = require('pg');

// Create a new Postgres pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Get a Postgres client from the pool
const getClient = async () => {
  const client = await pool.connect();
  return client;
};

// Release the client back to the pool
const releaseClient = async (client) => {
  await client.release();
};

// Get a user by email
const getUserByEmail = async (email) => {
  const client = await getClient();

  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return null;
    }

    const user = result.rows[0];
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting user by email');
  } finally {
    await releaseClient(client);
  }
};

// Create a new user
const createUser = async (username, password, email) => {
  const client = await getClient();

  try {
    const result = await client.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *', [username, password, email]);
    const user = result.rows[0];
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating user');
  } finally {
    await releaseClient(client);
  }
};

module.exports = {
  getUserByEmail,
  createUser,
};
