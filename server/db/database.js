const { Pool } = require('pg');

console.log(process.env.DB_USER); //to debug 
console.log(process.env.DB_PASSWORD);

// create a new connection pool to the database
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// function to execute a SQL query
const query = (text, params) => {
  return pool.query(text, params)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error(error);
      throw new Error('Error executing database query');
    });
};

module.exports = {
  pool,
};
